import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, UserType } from 'src/common/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login(user:{id: number; type:UserType}){

     const payload:JwtPayload={
      sub:user.id,
      type:user.type,
     };

     return{
      accessToken: this.jwtService.sign(payload),
      type: user.type,
     }
    
  }


}
