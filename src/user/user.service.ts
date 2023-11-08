import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatchException, ExceptionResponse } from '../util/exception';
import { UserResponseCommon } from '../util/response';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>
    ) { }

    async profile(req_id: number, profile_id: number) {
        try {
            const user = await this.userRepo.findOne({ where: { id: profile_id } })
            if (!user) throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'User not found')

            return new UserResponseCommon(user)
        } catch (e) {
            throw new CatchException(e)
        }
    }

    async follow(req_id: number, follow_id: number){
        try {
            const user_rec = await this.userRepo.findOne({ where: { id: follow_id } })
            if (!user_rec) throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'User not found')

            const user_send = await this.userRepo.findOne({ where: { id: req_id } })

            await Promise.all([
                this.userRepo.update({id: follow_id}, {follower: [...user_rec.follower, req_id]}),
                this.userRepo.update({id: req_id}, {following: [...user_send.following, follow_id]})
            ]) 
            
        } catch (e) {
            throw new CatchException(e)
        }
    }

    async unfollow(req_id: number, follow_id: number){
        try {
            const user_rec = await this.userRepo.findOne({ where: { id: follow_id } })
            if (!user_rec) throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'User not found')

            const user_send = await this.userRepo.findOne({ where: { id: req_id } })
            
            
        } catch (e) {
            throw new CatchException(e)
        }
    }
}
