import{Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
import { User } from "./users.entity";

@Entity()
export class Story{
    @PrimaryGeneratedColumn()
    storyid: number;



    @ManyToOne(() => User, (users) => users.story)
    users: User
}
