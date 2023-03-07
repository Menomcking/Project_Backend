/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Render, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { DataSource, UpdateDateColumn } from 'typeorm';
import { AppService } from './app.service';
import { LocalAuthenticationGuard } from './auth/localAuthentication.guard';
import RequestWithUser from './auth/requestWithUser.interface';
import NewUserDto from './dto/newUser.dto';
import { Users } from './users/users.entity';
import { AuthenticationService } from './auth/authentication.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
    private authenticationService: AuthenticationService
  ) {}
}
