import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ratings } from './entities/rating.entity';
import { StoryModule } from 'src/story/story.module';
import { UsersModule } from 'src/users/users.module';
import { StoryService } from 'src/story/story.service';
import { Story } from 'src/story/entities/story.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Ratings, Story]), StoryModule],
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class RatingsModule {}
