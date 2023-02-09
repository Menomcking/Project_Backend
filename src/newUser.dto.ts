/* eslint-disable prettier/prettier */

import { Contains, IsDefined, IsEmail, isEmail, IsStrongPassword, Length, Max, MAX, MaxLength, Min, MinLength } from "class-validator";

export default class NewUserDto {

  @IsDefined({message: 'A felhasználónév megadása kötelező'})
  @MinLength(3, {message: 'A felhasználónév 3-16 karakter terjedelmű lehet'})
  @MaxLength(16, {message: 'A felhasználónév 3-16 karakter terjedelmű lehet'})
  username: string;

  @IsDefined({message: 'A jelszó megadása kötelező'})
  @IsStrongPassword({ minNumbers: 1, minLength: 5,  minSymbols: 1, minUppercase: 1}, {message: 'A jelszónak legalább 5 karakter hosszúnak kell lennie, tartalmaznia kell legalább 1 számot, nagybetűt és szimbólumot'})
  password: string;

  @IsDefined({message: 'Az email megadása kötelező'})
  @IsEmail({}, {message: 'Az email formátuma nem megfelelő'})
  email: string;
}
