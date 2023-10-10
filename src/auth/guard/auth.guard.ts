import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExceptionResponse } from '../../util/exception';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info: Error) {
        if (err || !user) {
            throw new ExceptionResponse(HttpStatus.UNAUTHORIZED, 'Token not found')
        }
        return user;
    }
}

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
    handleRequest(err, user, info: Error) {
        if (err || !user) {
            throw new ExceptionResponse(HttpStatus.UNAUTHORIZED, 'Token not found')
        }
        return user;
    }
}