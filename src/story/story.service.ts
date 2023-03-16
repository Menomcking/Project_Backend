import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Connection, DataSource, Repository } from 'typeorm';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { Story } from './entities/story.entity';
import { StoryParts } from './entities/storyParts.entity';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story)
    private storyRepository: Repository<Story>,
    @InjectRepository(StoryParts)
    private storyPartsRepository: Repository<StoryParts>,
    private connection: Connection,
    private usersService: UsersService
  ) {}

  async createStory(
    picture: string,
    rating: number,
    title: string,
    description: string,
    textPart: string,
    user: Users
  ) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Create a new Story
      const story = new Story();
      story.picture = picture;
      story.rating = rating;
      story.title = title;
      story.description = description;
      story.users = user;

      // Save the new Story
      const savedStory = await queryRunner.manager.save(story);

      // Create a new StoryParts
      const storyParts = new StoryParts();
      storyParts.textPart = textPart;
      storyParts.story = savedStory;

      // Save the new StoryParts
      const savedStoryParts = await queryRunner.manager.save(storyParts);

      // Commit the transaction
      await queryRunner.commitTransaction();

      // Return the saved entities
      return { savedStory, savedStoryParts };
    } catch (error) {
      // Rollback the transaction if any errors occur
      await queryRunner.rollbackTransaction();
      throw new Error(`Transaction failed. Rolled back. ${error.message}`);
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }
  findAll() {
    return `This action returns all story`;
  }

  findOne(id: number) {
    return `This action returns a #${id} story`;
  }

  update(id: number, updateStoryDto: UpdateStoryDto) {
    return `This action updates a #${id} story`;
  }

  remove(id: number) {
    return `This action removes a #${id} story`;
  }
}
