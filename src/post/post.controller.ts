import { Body, Controller, Get, HttpStatus, Post, Query, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AccessTokenGuard } from '../auth/guard/auth.guard';
import { AspectLogger } from '../util/interceptor';
import { BaseResponse } from '../util/response';
import { CreatePostDto } from './dto/create-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { TimelineQueryDto } from './dto/query-timeline.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';
import { TimelineResponseSwagger } from './response/timeline.response';

@UseGuards(AccessTokenGuard)
@UseInterceptors(AspectLogger)
@Controller('post')
@ApiTags('Post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({summary: 'Tạo bài viết'})
  @ApiOkResponse({type: BaseResponse, status: HttpStatus.OK})
  @Post('create')
  async create(@Req() req: Request, @Body() b: CreatePostDto, @Res() res: Response) {
    await this.postService.create(b, req.user['sub'])
    return res.status(HttpStatus.OK).send(new BaseResponse({}))
  }

  @ApiOperation({summary: 'Cập nhật bài viết'})
  @ApiOkResponse({type: BaseResponse, status: HttpStatus.OK})
  @Post('update')
  async update(@Req() req: Request, @Body() b: UpdatePostDto, @Res() res: Response) {
    await this.postService.update(b, req.user['sub'])
    return res.status(HttpStatus.OK).send(new BaseResponse({}))
  }

  @ApiOperation({summary: 'Xoá bài viết'})
  @ApiOkResponse({type: BaseResponse, status: HttpStatus.OK})
  @Post('delete')
  async delete(@Req() req: Request, @Body() b: DeletePostDto, @Res() res: Response) {
    await this.postService.delete(b.id, req.user['sub'])
    return res.status(HttpStatus.OK).send(new BaseResponse({}))
  }

  @ApiOperation({summary: 'Lấy bài viết'})
  @ApiOkResponse({type: TimelineResponseSwagger, status: HttpStatus.OK})
  @Get()
  async getTimeline(@Req() req: Request, @Query() q: TimelineQueryDto, @Res() res: Response) {
    const data = await this.postService.getTimeline(req.user['sub'], q.user_id)
    return res.status(HttpStatus.OK).send(new BaseResponse({data}))
  }
}
