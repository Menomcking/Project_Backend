/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Double } from "typeorm";
import { Ratings } from "../db/database/entities/ratings.entity";
import { Story } from "../story/story.entity";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
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

  @OneToMany(() => Ratings, (ratings) => ratings.users)
  ratings: Ratings[]
}
