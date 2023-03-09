import { IsDefined, MinLength } from "class-validator";

export default class StoryPartsDto {
    @IsDefined({message: 'A szövegrészlet megadása kötelező.'})
    @MinLength(10, {message: 'A szövegrészletnek legalább 10 karakter hosszúnak kell lennie.'})
    textPart: string;
}