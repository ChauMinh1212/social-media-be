import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";

@Entity('post')
export class PostEntity {
    @PrimaryGeneratedColumn({
        type: 'integer'
    })
    id: number

    @Column({
        type: 'varchar',
        default: ''
    })
    content: string

    @Column({
        type: 'varchar',
        array: true,
        default: []
    })
    media: string[]

    @Column({
        type: 'integer',
        default: 0
    })
    no_of_love: number

    @Column({
        type: 'integer',
        default: 1
    })
    status: number

    @Column({
        type: 'integer',
        default: 1
    })
    view: number

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({name: 'user_id'})
    user: UserEntity

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string
}
