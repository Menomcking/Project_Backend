/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Request } from '@nestjs/common';
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

  @Get('get-user-stories')
  @UseGuards(JwtAuthenticationGuard)
  async getUserStories(@Request() req) {
    const userId = req.user.id;
    return this.storyService.findAllByUserId(userId);
  }

  @Get('get-story/:storyId')
  @UseGuards(JwtAuthenticationGuard)
  async getStory(@Param('storyId') storyId: number): Promise<Story> {
    return this.storyService.findOne(storyId);
  }

  @Patch('update-story/:storyId')
    async updateStory(
  @Param('id') id: number,
  @Body() updateStoryDto: UpdateStoryDto,
    ): Promise<Story> {
  return this.storyService.update(id, updateStoryDto);
  }

  @Get()
  findAll() {
    return this.storyService.findAll();
  }

  @Get('list/:id')
  findOne(@Param('id') id: string): Promise<Story> {
  return this.storyService.findOne(Number(id));
  }

  /*@Get('list-by-user/:id')
  findAllById(@Param('id') id: number): Promise<Story[]> {
  return this.storyService.findAllById(id);
  }*/

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoryDto: UpdateStoryDto) {
    return this.storyService.update(+id, updateStoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storyService.remove(+id);
  }
}
