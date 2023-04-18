/* eslint-disable prettier/prettier */
import { Ratings } from "src/ratings/entities/rating.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Double } from "typeorm";
import { Story } from "../story/entities/story.entity";

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
