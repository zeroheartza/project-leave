import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class tbUserProfile {
   
    

    @PrimaryGeneratedColumn()
    profileId : number


    @Column()
    staffId: string

    @Column()
    name: string


    @Column()
    phone : string

    @Column()
    position: string

    @Column()
    department: string
    
    @Column()
    startingDate: string

    @Column()
    userId : number

    
}