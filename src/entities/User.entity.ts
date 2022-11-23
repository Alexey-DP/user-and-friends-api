import { UserGender } from '../enum/user-gender.enum';
import { Entity, Column, ManyToMany, JoinTable, JoinColumn } from "typeorm"
import Base from './Base'

@Entity('users')
export class User extends Base {

    @Column({ type: 'varchar', length: 32 })
    first_name: string

    @Column({ type: 'enum', enum: UserGender })
    gender: UserGender

    @ManyToMany(() => User)
    @JoinTable()
    following: User[]

}
