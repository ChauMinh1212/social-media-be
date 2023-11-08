import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "../../post/entities/post.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { BaseEntity } from "../../util/base.entity";

@Entity('comment')
export class CommentEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'integer'
    })
    id: number

    @ManyToOne(() => PostEntity, (post) => post.id)
    @JoinColumn({name: 'post_id'})
    post: PostEntity

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({name: 'user_id'})
    user: UserEntity

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
    no_of_like: number

    @Column({
        type: 'integer',
        default: 0
    })
    status: number
}
