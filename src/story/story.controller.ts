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
    /**
     * 
     * @param createStoryDto Történet létrehozásához szükséges dto fájl
     * @param req Request, ami kéri a felhasználót
     * @returns Létrehoz egy új történetet a paraméterekkel együtt
     */
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

  @Get('one/:id')
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
  /**
   * 
   * @param id Azonosító
   * @param updateStoryDto A történet módosításához szükséges dto fájl
   * @returns Id alapján módosítja a már létező történetet adatait
   */
  @Patch('update-story/:id')
    async updateStory(
  @Param('id') id: number,
  @Body() updateStoryDto: UpdateStoryDto,
    ): Promise<Story> {
  return this.storyService.update(id, updateStoryDto);
  }

  @Get(':id')
  async findOnesStory(@Param('id') id: string) {
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
}
