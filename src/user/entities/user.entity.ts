import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class UserEntity {
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

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string
}