import{Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
import { Users } from "./users.entity";

@Entity()
export class Story{
    @PrimaryGeneratedColumn()
    storyid: number;



    @ManyToOne(() => Users, (users) => users.story)
    users: Users
}