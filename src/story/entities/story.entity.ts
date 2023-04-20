/* eslint-disable prettier/prettier */
import{Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { StoryParts } from "./storyParts.entity";
import { Users } from "../../users/users.entity";
import { Ratings } from "src/ratings/entities/rating.entity";

@Entity()
export class Story{
    @PrimaryGeneratedColumn()
    id: number;

    @Column('')
    picture: string;

    @Column('double')
    rating: number;

    @Column()
    title: string;
     
    @Column()
    description: string;

    @OneToMany(() => StoryParts, (storyparts) => storyparts.story)
    storyparts: StoryParts[]

    @ManyToOne(() => Users, (users) => users.story)
    users: Users

    @OneToMany(() => Ratings, (ratings) => ratings.story)
    ratings: Ratings[]
}
