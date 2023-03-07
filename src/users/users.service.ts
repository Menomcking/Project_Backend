import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import  NewUserDto  from '../dto/newUser.dto';
 
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}
 
  async getById(id: number) {
    const user = await this.usersRepository.findOne({where: { id }});
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({where: { email }});
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }
  async getByName(username: string){
    const user = await this.usersRepository.findOne({where:{ username }});
    if (user){
      return user;
    }
    throw new HttpException('User with this username does not exist', HttpStatus.NOT_FOUND);
  }
 
  async create(userData: NewUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }
}