/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Story } from "./story.entity";

@Entity()
export class StoryParts{
    @PrimaryGeneratedColumn()
    textPartId: number;

    @Column()
    storyId: number;

    @Column({ type: 'text', array: true })
    textPart: string[];

    @ManyToOne(() => Story, (story) => story.storyparts)
    story: Story

}