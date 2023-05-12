import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from 'src/story/entities/story.entity';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Ratings } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Ratings)
    private ratingsRepository: Repository<Ratings>,
    @InjectRepository(Story)
    private storyRepository: Repository<Story>,
  ) {}
  async create(ratingData: Partial<Ratings>): Promise<Ratings> {
    const rating = new Ratings();
    rating.users = ratingData.users;
    rating.rating = ratingData.rating;

    if (ratingData.story) {
      const story = await this.storyRepository.createQueryBuilder('story')
        .leftJoinAndSelect('story.ratings', 'ratings')
        .where('story.id = :id', { id: ratingData.story })
        .getOne();

      if (!story) {
        throw new Error('Story not found');
      }

      const storyRatings = story.ratings;
      const totalRating = storyRatings.reduce(
        (sum, r) => sum + r.rating,
        rating.rating,
      );
      const averageRating = totalRating / storyRatings.length;

      story.rating = averageRating;
      await this.storyRepository.save(story);

      rating.story = story;
    }

    const savedRating = await this.ratingsRepository.save(rating);

    return savedRating;
  }
}
