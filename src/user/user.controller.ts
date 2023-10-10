import { Controller, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AspectLogger } from '../util/interceptor';
import { UserService } from './user.service';

@ApiTags('User')
@UseInterceptors(AspectLogger)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
