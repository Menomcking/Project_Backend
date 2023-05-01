import { Story } from "src/story/entities/story.entity";
import { Users } from "src/users/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ratings{
  @PrimaryGeneratedColumn()
  id: number;

    @ManyToOne(() => Users, (users) => users.ratings)
    users: Users;

    @ManyToOne(() => Story, (story) => story.ratings)
    story: Story;

    @Column({nullable: true})
    rating: number;

}
