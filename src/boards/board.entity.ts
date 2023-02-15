import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm" 
import { BoardStatus } from "./boards.model"

@Entity('board')
export class Board extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    status: BoardStatus
}
