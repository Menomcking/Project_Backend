/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Double } from "typeorm";
import { Story } from "./story.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column('int', {default: 0})
  commentsNumber: number;
  
  @Column('double', {default: 0})
  rating: number;

  @OneToMany(() => Story, (story) => story.users)
  story: Story[]
}
