import { UsersService } from "src/users/users.service";
import NewUserDto from "src/dto/newUser.dto";
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { TokenPayload } from "./tokenPayload.interface";
import { PostgresErrorCode } from "src/db/database/postgresErrorCodes.enum";

@Injectable()
export class AuthenticationService {
    constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService
    ) {}
   
    public async register(registrationData: NewUserDto) {
      const hashedPassword = await bcrypt.hash(registrationData.password, 10);
      try {
        const createdUser = await this.usersService.create({
          ...registrationData,
          password: hashedPassword
        });
        createdUser.password = undefined;
        return createdUser;
      } catch (error) {
        if (error?.code === PostgresErrorCode.UniqueViolation) {
          throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
        }
        throw new HttpException(`Something went wrong ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

   
public async getAuthenticatedUser(email: string, plainTextPassword: string) {
  try {
    const user = await this.usersService.getByEmail(email);
    await this.verifyPassword(plainTextPassword, user.password);
    user.password = undefined;
    return user;
  } catch (error) {
    throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
  }
}
 
private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
  const isPasswordMatching = await bcrypt.compare(
    plainTextPassword,
    hashedPassword
  );
  if (!isPasswordMatching) {
    throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
  }
}
      public getJwtToken(userId: number) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload);
        return token;
      }
    }
    