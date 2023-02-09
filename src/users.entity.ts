/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Double } from "typeorm";
import { Ratings } from "./ratings.entity";
import { Story } from "./story.entity";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column('int')
  commentsNumber: number;
  
  @Column('double')
  rating: number;

  @OneToMany(() => Story, (story) => story.users)
  story: Story[]

  @OneToMany(() => Ratings, (ratings) => ratings.users)
  ratings: Ratings[]
}
