/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Render } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import NewUserDto from './newUser.dto';
import { Users } from './users.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Post('/register')
  async newUser(@Body() user: NewUserDto) {
    const userRepo = this.dataSource.getRepository(Users);
    userRepo.save(user);
    return user;
  }

  @Delete('/register/:id')
  async deleteUser(@Param('id') id: number) {
    const userRepo = this.dataSource.getRepository(Users)
    userRepo.delete(id)
  }
}
