import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../util/base.entity";

@Entity('user')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number

    @Column({
        type: 'varchar'
    })
    user_name: string

    @Column({
        type: 'varchar',
        default: ''
    })
    description: string

    @Column({
        type: 'varchar'
    })
    email: string

    @Column({
        type: 'varchar'
    })
    password: string

    @Column({
        type: 'varchar'
    })
    avatar: string

    @Column({
        type: 'int',
        array: true,
        default: []
    })
    follower: number[]

    @Column({
        type: 'int',
        array: true,
        default: []
    })
    following: number[]

    @Column({
        type: 'int',
        default: 0
    })
    no_of_post: number

    @Column({
        type: 'int',
        default: 0
    })
    is_active: number

    @Column({
        type: 'int'
    })
    code_active: number

    @Column({
        type: 'varchar',
        nullable: true
    })
    refresh_token: string
}