import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class tbLeave {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    start: string

    @Column()
    end: string

    @Column()
    category: string

    @Column()
    reason: string

    @Column()
    status: string

    @Column()
    userid: number
}