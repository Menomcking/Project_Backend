/* eslint-disable prettier/prettier */
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
  findAll() {
    return `This action returns all story`;
  }

  async findOne(id: number): Promise<Story> {
    const story = await this.storyRepository.findOne({
      where: {
        id,
      },
      relations: ['storyparts', 'users', 'ratings'],
    });
  
    if (!story) {
      throw new Error(`Story with id ${id} not found`);
    }
  
    return story;
  }


  async update(id: number, updateStoryDto: UpdateStoryDto): Promise<Story> {
    const story = await this.storyRepository.findOne({ where: { id } });
  
    if (!story) {
      throw new Error(`Story with id ${id} not found`);
    }
  
    const { picture, title, description, textPart } = updateStoryDto;
  
    story.picture = picture !== undefined ? picture : story.picture;
    story.title = title !== undefined ? title : story.title;
    story.description = description !== undefined ? description : story.description;
  
    const storyParts = await this.storyPartsRepository.find({
      where: { story: { id } },
    });
  
    if (textPart !== undefined) {
      if (storyParts.length === textPart.length) {
        for (let i = 0; i < storyParts.length; i++) {
          storyParts[i].textPart = [textPart[i]];
          await this.storyPartsRepository.save(storyParts[i]);
        }
      } else if (storyParts.length < textPart.length) {
        for (let i = storyParts.length; i < textPart.length; i++) {
          const newStoryPart = new StoryParts();
          newStoryPart.textPart = [textPart[i]];
          newStoryPart.story = story;
          await this.storyPartsRepository.save(newStoryPart);
        }
      } else {
        throw new Error(
          `Number of text parts (${textPart.length}) doesn't match the current number of story parts (${storyParts.length})`,
        );
      }
    }
  
    return this.storyRepository.save(story);
  }

  remove(id: number) {
    return `This action removes a #${id} story`;
  }

  async findAllByUserId(id: number): Promise<Story[]> {
    return this.storyRepository.find({
      where: {
        users: { id }
      }
    });
  }
}
