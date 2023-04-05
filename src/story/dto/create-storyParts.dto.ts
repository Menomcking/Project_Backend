/* eslint-disable prettier/prettier */
import { ArrayMinSize, ArrayNotEmpty, IsArray, IsDefined, IsNotEmpty, IsString, MinLength, ValidateNested } from "class-validator";

export default class StoryPartsDto {

    storyId: number;

    @IsDefined({message: 'A szövegrészlet megadása kötelező.'})
    @IsArray()
    textPart: string[];
}