import { Body, Controller, HttpStatus, Param, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AccessTokenGuard } from '../auth/guard/auth.guard';
import { AspectLogger } from '../util/interceptor';
import { BaseResponse } from '../util/response';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ParamIdDto } from './dto/id.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@UseInterceptors(AspectLogger)
@UseGuards(AccessTokenGuard)
@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}  

  @ApiOperation({summary: 'Tạo comment'})
  @ApiOkResponse({type: BaseResponse, status: HttpStatus.OK})
  @Post('create')
  async create(@Req() req: Request, @Body() b: CreateCommentDto, @Res() res: Response){
    await this.commentService.create(b, req.user['sub'])
    return res.status(HttpStatus.OK).send(new BaseResponse({}))
  }

  @ApiOperation({summary: 'Cập nhật comment'})
  @ApiOkResponse({type: BaseResponse, status: HttpStatus.OK})
  @Post('update/:id')
  async update(@Req() req: Request, @Body() b: UpdateCommentDto, @Param() p: ParamIdDto, @Res() res: Response){
    await this.commentService.update(b, req.user['sub'], +p.id)
    return res.status(HttpStatus.OK).send(new BaseResponse({}))
  }

  @ApiOperation({summary: 'Xoá comment'})
  @ApiOkResponse({type: BaseResponse, status: HttpStatus.OK})
  @Post('delete/:id')
  async delete(@Req() req: Request, @Param() p: ParamIdDto, @Res() res: Response){
    await this.commentService.delete(req.user['sub'], +p.id)
    return res.status(HttpStatus.OK).send(new BaseResponse({}))
  }
}
