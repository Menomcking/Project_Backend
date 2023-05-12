import { Module } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryController } from './story.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { StoryParts } from './entities/storyParts.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { RatingsService } from 'src/ratings/ratings.service';
import { RatingsModule } from 'src/ratings/ratings.module';

@Module({
  imports: [TypeOrmModule.forFeature([Story, StoryParts]), UsersModule],
  controllers: [StoryController],
  providers: [StoryService]
})
export class StoryModule {}
