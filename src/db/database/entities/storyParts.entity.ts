import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Story } from "../../../story/story.entity";

@Entity()
export class StoryParts{
    @PrimaryGeneratedColumn()
    textPartId: number;

    @Column('text')
    textPart: string;

    @ManyToOne(() => Story, (story) => story.storyparts)
    story: Story[]

}