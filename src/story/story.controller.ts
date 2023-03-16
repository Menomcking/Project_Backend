import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { Users } from 'src/users/users.entity';
import CreateStoryPartsDto from './dto/create-storyParts.dto';
import { TokenPayload } from 'src/auth/tokenPayload.interface';

@Controller('story')
export class StoryController {
  constructor(
    private readonly storyService: StoryService) {}

  @Post('add')
  create(@Body() createStoryDto: CreateStoryDto, createStoryPartsDto: CreateStoryPartsDto, @Req() req: Express.Request, payload: TokenPayload) {
    return this.storyService.createStory(createStoryDto.picture, 0, createStoryDto.title,createStoryDto.description,createStoryPartsDto.textPart,req.user as Users);
  }

  @Get()
  findAll() {
    return this.storyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storyService.findOne(+id);
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