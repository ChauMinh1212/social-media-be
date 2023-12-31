import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import { BaseEntity } from "../../util/base.entity";

@Entity('post')
export class PostEntity extends BaseEntity {
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
        default: 0
    })
    no_of_comment: number

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
}
