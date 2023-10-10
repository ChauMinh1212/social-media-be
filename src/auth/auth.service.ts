import { CACHE_MANAGER, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { CatchException, ExceptionResponse } from '../util/exception';
import { MailingService } from '../mailing/mailing.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly redis: Cache,
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    private readonly mailingService: MailingService,
    private readonly jwtService: JwtService
  ) { }
  async register(b: RegisterDto) {
    try {
      //Check email có đăng ký hay chưa
      const email = await this.userRepo.findOne({ where: { email: b.email } })
      if (email) throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'Email đã được đăng ký')
      const code = Math.floor(10000 + Math.random() * 90000);

      const new_user = this.userRepo.create({
        ...b,
        is_active: 0,
        code_active: code
      })

      await this.userRepo.save(new_user)

      const token = await this.getTokens(new_user.id, new_user.user_name)
      
      new_user.refresh_token = token.refresh_token

      await this.userRepo.save(new_user)

      // await this.mailingService.sendMail(b.email, code)

      return {
        user_name: new_user.user_name,
        email: new_user.email,
        is_active: new_user.is_active,
        ...token
      }

    } catch (e) {
      throw new CatchException(e)
    }
  }

  async login(body: LoginDto) {
    try {
      const user = await this.userRepo.findOne({where: {email: body.email}})
      if(!user || user.password != body.password) throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'Tài khoản hoặc mật khẩu không chính xác')

      const token = await this.getTokens(user.id, user.user_name)
      
      return {
        user_name: user.user_name,
        email: user.email,
        avatar: user.avatar,
        is_active: user.is_active,
        access_token: token.access_token,
        refresh_token: user.refresh_token
      }
    } catch (e) {
      throw new CatchException(e)
    }
  }

  async resendCode(user_id: any) {
    try {
      const user = await this.userRepo.findOne({ where: { id: user_id } })
      if (!user) throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'User not found')

      const code = Math.floor(10000 + Math.random() * 90000);
      await this.userRepo.update({ id: user_id }, { code_active: code })
      await this.mailingService.sendMail(user.email, code)
    } catch (e) {
      throw new CatchException(e)
    }
  }

  async verifyCode(code: number, user_id: number) {
    try {
      const user = await this.userRepo.findOne({ where: { id: user_id } })
      if (!user) throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'User not found')

      if (user.code_active != code) throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'Code is not correct')
      await this.userRepo.update({ id: user_id }, { is_active: 1 })
    } catch (e) {
      throw new CatchException(e)
    }
  }

  async refreshToken(user_id: number, refresh_token: string) {
    try {
      const user = await this.userRepo.findOne({ where: { id: user_id } });
      if (!user || !user.refresh_token)
        throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'refresh token không hợp lệ');

      if (user.refresh_token != refresh_token) throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'refresh token không hợp lệ');

      const tokens = await this.getTokens(user.id, user.user_name);
      return { access_token: tokens.access_token };
    } catch (e) {
      throw new CatchException(e)
    }
  }

  async getTokens(id: number, username: string) {
    try {
      const [access_token, refresh_token] = await Promise.all([
        this.jwtService.signAsync(
          {
            sub: id,
            username,
          },
          {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '15m',
          },
        ),
        this.jwtService.signAsync(
          {
            sub: id,
            username,
          },
          {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '1000y',
          },
        ),
      ]);

      return {
        access_token,
        refresh_token
      };
    } catch (e) {
      throw new CatchException(e)
    }
  }
}
