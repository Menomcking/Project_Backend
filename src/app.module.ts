import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Ratings } from './db/database/entities/ratings.entity';
import { Story } from './story/entities/story.entity';
import { StoryParts } from './story/entities/storyParts.entity';
import { Users } from './users/users.entity';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import Post from './posts/post.entity';
import { AuthenticationModule } from './auth/authentication.module';
import { UsersModule } from './users/users.module';
import { AuthenticationService } from './auth/authentication.service';
import { UsersService } from './users/users.service';
import { StoryModule } from './story/story.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: '',
      database: 'projectdb',
      entities: [
        Users, Story, StoryParts, Ratings, Post 
      ],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        //...
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      })
    }),
    AuthenticationModule,UsersModule, StoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
