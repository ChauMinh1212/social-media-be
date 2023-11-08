import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatchException, ExceptionResponse } from '../util/exception';
import { UserEntity } from '../user/entities/user.entity';
import { POST_STATUS, POST_VIEW } from '../util/enum';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { TimelineResponse } from './response/timeline.response';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity) private readonly postRepo: Repository<PostEntity>,
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(b: CreatePostDto, user_id: number) {
    try {
      const new_post = this.postRepo.create({
        ...b,
        user: {
          id: user_id
        }
      })

      await this.postRepo.save(new_post)

      if(b.view == POST_VIEW.PUBLIC) {
        await this.userRepo.update({id: user_id}, {no_of_post: () => 'no_of_post + 1'})
      }
    } catch (e) {
      throw new CatchException(e)
    }
  }

  async update(b: UpdatePostDto, user_id: number) {
    try {
      const { id, ...body_update } = b

      const post = await this.postRepo.findOne({ where: { id }, relations: { user: true } })
      if (!post || post.user.id != user_id) throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'post not found')

      await this.postRepo.update({ id }, body_update)
    } catch (e) {
      throw new CatchException(e)
    }
  }

  async delete(post_id: number, user_id: number) {
    try {
      const post = await this.postRepo.findOne({where: {id: post_id, user: {id: user_id}}})
      if(!post) throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'post not found')

      await this.postRepo.update({id: post_id}, {status: POST_STATUS.DELETE})
      if(post.view == POST_VIEW.PUBLIC){
        await this.userRepo.update({id: user_id}, {no_of_post: () => 'no_of_post - 1'})
      }
    } catch (e) {
      throw new CatchException(e)
    }
  }

  async getTimeline(user_id: number, profile_id: number) {
    try {
      const post = await this.postRepo.find({ where: {status: POST_STATUS.NORMAL}, relations: { user: true } })
      const data = TimelineResponse.mapToList(post)
      return data
    } catch (e) {
      throw new CatchException(e)
    }
  }

}
