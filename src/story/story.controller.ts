/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { Users } from 'src/users/users.entity';
import CreateStoryPartsDto from './dto/create-storyParts.dto';
import { Story } from './entities/story.entity';
import NewStoryDto from 'src/dto/newStory.dto';
import { DataSource } from 'typeorm';

@Controller('story')
export class StoryController {
  constructor(
    private readonly storyService: StoryService) {}

  @Post('add-story')
  create(@Body() createStoryDto: CreateStoryDto, @Req() req: Express.Request) {
    return this.storyService.createStory(
      createStoryDto.picture,
      0,
      createStoryDto.title,
      createStoryDto.description,
      req.user as Users);
  }

  @Post('add-storyparts')
  createStoryparts(@Body() createStoryPartsDto: CreateStoryPartsDto, @Req() req: Express.Request) {
    return this.storyService.createStoryparts(createStoryPartsDto.textPart);
  }

  @Get()
  findAll() {
    return this.storyService.findAll();
  }

  @Get('list/:id')
  findOne(@Param('id') id: string) {  Promise<Story>
    return this.storyService.findOne(Number(id));
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
