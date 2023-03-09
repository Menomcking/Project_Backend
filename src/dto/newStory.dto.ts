/* eslint-disable prettier/prettier */

import { IsDefined } from "class-validator";

export default class NewStoryDto {
  @IsDefined({message: 'Meg kell adni a címet'})
  cim: string;

  @IsDefined({message: 'Nem lehet üres a szöveg rész'})
  textPart: string[];
}
