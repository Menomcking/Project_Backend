/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Story } from "./story.entity";
import { Users } from "./users.entity";

@Entity()
export class Ratings{
  @PrimaryGeneratedColumn()
  id: number;

    @ManyToOne(() => Users, (users) => users.ratings)
    users: Users;

    @ManyToOne(() => Story, (story) => story.ratings)
    story: Story;
    

    @Column()
    rating: number;

}
