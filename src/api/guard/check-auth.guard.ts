import {
    BadRequestException,
    CanActivate,
    ConflictException,
    ExecutionContext,
    Injectable,
    UnprocessableEntityException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { Request } from 'express';
  import { Observable } from 'rxjs';
  import { JwtService, NotBeforeError, TokenExpiredError } from '@nestjs/jwt';
  import { ConfigService } from '@nestjs/config';import { Protected } from 'src/common/decorator/protected.decorator';
import { UserRoles } from 'src/common/database/Enums';

  
  export declare interface RequestInterface extends Request {
    userId: number | undefined;
    role: string | undefined
  }
  
  @Injectable()
  export class CheckAuthGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService: JwtService, private config: ConfigService) { }
  
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<RequestInterface>();
  
        const isProtected = this.reflector.get<boolean>(Protected, context.getHandler());
  
        if (!isProtected) {
            request.role = UserRoles.USER;
            return true;
        }
  
        const bearerToken = request.headers['authorization'];
        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            throw new BadRequestException('Please provide valid bearer token');
        }
  
        const token = bearerToken.split(' ')[1];
        const secretKey = this.config.get<string>('ACCESS_TOKEN_SECRET_KEY');
  
        try {
            const userDecodedData = this.jwtService.verify(token, { secret: secretKey });
            request.userId = userDecodedData.id; // userId olish
            request.role = userDecodedData.role; // role olish
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new UnprocessableEntityException("Token already expired");
            }
            if (error instanceof NotBeforeError) {
                throw new ConflictException("Token not before error");
            }
            throw new BadRequestException(error.message);
        }
  
        return true;
    }
  }
  