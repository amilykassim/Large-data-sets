import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 16})
    nid: string;

    @Column({length: 50})
    name: string;

    @Column({length: 50})
    phone: string;

    @Column({length: 1})
    gender: string;

    @Column({length: 255})
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}