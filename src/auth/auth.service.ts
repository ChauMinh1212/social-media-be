import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  register(b: RegisterDto) {
    return 'Register success';
  }
}
