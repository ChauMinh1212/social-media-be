import { Controller, Get, HttpStatus, Param, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AccessTokenGuard } from '../auth/guard/auth.guard';
import { AspectLogger } from '../util/interceptor';
import { BaseResponse } from '../util/response';
import { UserService } from './user.service';


@ApiTags('User')
@UseInterceptors(AspectLogger)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({summary: 'Lấy thông tin user'})
  @UseGuards(AccessTokenGuard)
  @Get('profile/:id')
  async profile(@Req() req: Request, @Param() p: any, @Res() res: Response){
    const data = await this.userService.profile(req.user['sub'], p.id)
    return res.status(HttpStatus.OK).send(new BaseResponse({data}))
  }

  @ApiOperation({summary: 'Theo dõi user'})
  @UseGuards(AccessTokenGuard)
  @Post('follow/:id')
  async follow(@Req() req: Request, @Param() p: any, @Res() res: Response){
    const data = await this.userService.follow(req.user['sub'], p.id)
    return res.status(HttpStatus.OK).send(new BaseResponse({data}))
  }

  @ApiOperation({summary: 'Bỏ theo dõi user'})
  @UseGuards(AccessTokenGuard)
  @Post('unfollow/:id')
  async unfollow(@Req() req: Request, @Param() p: any, @Res() res: Response){
    const data = await this.userService.follow(req.user['sub'], p.id)
    return res.status(HttpStatus.OK).send(new BaseResponse({data}))
  }
}
