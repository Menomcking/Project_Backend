import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Double } from "typeorm";
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

    @Column()
    rating: Double;

    @OneToMany(() => Story, (story) => story.users)
    story: Story[]
}