import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../post/entities/post.entity';
import { COMMENT_STATUS, POST_STATUS } from '../util/enum';
import { CatchException, ExceptionResponse } from '../util/exception';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity) private readonly commentRepo: Repository<CommentEntity>,
    @InjectRepository(PostEntity) private readonly postRepo: Repository<PostEntity>
  ){}
  async create(b: CreateCommentDto, user_id: number) {
    try {
      const post = await this.postRepo.findOne({where: {id: b.post_id, status: POST_STATUS.NORMAL}})
      if(!post) throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'post not found')

      const new_comment = this.commentRepo.create({
        ...b,
        post: {
          id: b.post_id
        },
        user: {
          id: user_id
        }
      })
      const save_comment = this.commentRepo.save(new_comment)
      const update_no_of_comment = this.postRepo.update({id: b.post_id}, {no_of_comment: () => 'no_of_comment + 1'})
      
      await Promise.all([save_comment, update_no_of_comment])
    } catch (e) {
      throw new CatchException(e)
    }
  }

  async update(b: any, user_id: number, comment_id: number){
    try {
      const comment = await this.commentRepo.findOne({where: {id: comment_id, user: {id: user_id}}})
      if(!comment) throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'comment not found')

      await this.commentRepo.update({id: comment_id}, b)
    } catch (e) {
      throw new CatchException(e)
    }
  }

  async delete(user_id: number, comment_id: number){
    try {
      const comment = await this.commentRepo.findOne({where: {id: comment_id, user: {id: user_id}}})
      if(!comment) throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'comment not found')

      const delete_comment = this.commentRepo.update({id: comment_id}, {status: COMMENT_STATUS.DELETE})
      const delete_no_of_comment = this.postRepo.update({id: comment.post.id}, {no_of_comment: () => 'no_of_comment - 1'})

      await Promise.all([delete_comment, delete_no_of_comment])
    } catch (e) {
      throw new CatchException(e)
    }
  }
}
