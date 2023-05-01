/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { Users } from 'src/users/users.entity';
import { Story } from './entities/story.entity';
import NewStoryDto from 'src/dto/newStory.dto';
import { DataSource } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';

@Controller('story')
export class StoryController {
  constructor(
    private readonly storyService: StoryService) {}

  @Post('add-story')
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() createStoryDto: CreateStoryDto, @Req() req: Express.Request) {
    return this.storyService.createStory(
      createStoryDto.picture,
      0,
      createStoryDto.title,
      createStoryDto.description,
      createStoryDto.textPart,
      req.user as Users);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const story = await this.storyService.findOne(+id);
    return {
      id: story.id,
      picture: story.picture,
      rating: story.rating,
      title: story.title,
      description: story.description,
      storyparts: story.storyparts.map((part) => ({
        textPart: part.textPart,
      })),
    };
  }

  @Get('list')
  async find() {
    return (await this.storyService.find()).map(s => ({ id: s.id, title: s.title, picture: s.picture, description: s.description, rating: s.rating}));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoryDto: UpdateStoryDto) {
    return this.storyService.update(+id, updateStoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storyService.remove(+id);
  }
}
