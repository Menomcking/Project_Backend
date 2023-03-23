import { IsDefined, MaxLength, MinLength } from "class-validator";
import StoryPartsDto from "./create-storyParts.dto";

export class CreateStoryDto {
    @IsDefined({message: 'A cím megadása kötelező.'})
    @MinLength(3, {message: 'A címnek minimum 3 karakter hosszúnak kell lennie.'})
    @MaxLength(30, {message: 'A cimnek maximum 30 karakter hosszúnak kell lennie.'})
    title: string;

    @IsDefined({message: 'Kép megadása kötelező.'})
    picture: string;

    @IsDefined({message: 'A leírás megadása kötelező.'})
    @MinLength(3, {message: 'A leírásnak minumum 3 karakter hosszúbak kell lennie.'})
    @MaxLength(200, {message: 'A leaírásnak maximum 200 karakter hosszűnak kell lennie.'})
    description: string;

    textPart: StoryPartsDto[];
}
