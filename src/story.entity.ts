import{Column, Double, Entity, Long, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { Ratings } from "./ratings.entity";
import { StoryParts } from "./storyParts.entity";
import { Users } from "./users.entity";

@Entity()
export class Story{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    authorId: number;

    @Column('Double')
    rating: number;

    @Column()
    title: string;

    @OneToMany(() => StoryParts, (storyparts) => storyparts.story)
    storyparts: StoryParts[]

    @ManyToOne(() => Users, (users) => users.story)
    users: Users

    @OneToMany(() => Ratings, (ratings) => ratings.story)
    ratings: Ratings[]
}
