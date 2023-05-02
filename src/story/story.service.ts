/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
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
    textPart: string[],
    user: Users,
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

      // Create a new StoryParts for each textPart
      const storyParts = textPart.map(text => {
        const part = new StoryParts();
        part.textPart = [text];
        part.story = savedStory;
        return part;
      });

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
  async findOne(id: number): Promise<Story> {
    const story = await this.storyRepository.findOne({
      where: {id},
      relations: ['storyparts'],
    });
    return story;
  }

  async find() { 
    const stories = await this.storyRepository.find({
      select: [ 'id', 'title', 'description', 'picture', 'rating'],
      relations: ['storyparts', 'users', 'ratings'],
    });

    if (stories.length == 0) {
      throw new Error(``);
    }
    const selectedStories: Story[] = []
    for (let index = 0; index < 5; index++) {
      if (stories.length == 0){
        break;
      }
      const selectedIndex = Math.floor(Math.random()*stories.length)
      
      selectedStories.push(stories[selectedIndex])
      stories.splice(selectedIndex, 1);
    }
    
    return selectedStories;
  }
}
