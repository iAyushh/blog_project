import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { JwtPayload, ValidatedUser } from 'src/common/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserType } from 'src/common/types';

export type ValidAuthResponse = {
  accessToken: string;
  type: UserType;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma:PrismaService,
  ) {}
  private generateJwt(payload: JwtPayload,options?:JwtSignOptions):string{
        return this.jwtService.sign(payload, options);
  }

  async validateToken(token:string){

    try{
        const payload = this.jwtService.verify<JwtPayload>(token);

        const user = await this.prisma.user.findUnique({
            where:{id:payload.sub},
        })

        if(!user){
            throw new UnauthorizedException();
        }

        return {
            id:user.id,
            type: user.role.toLocaleLowerCase() ,
        }
    }
    catch(error){
        throw new UnauthorizedException();
    }

  }
  async login(userId: number, type: UserType):Promise<ValidAuthResponse> {
    return {
       accessToken: this.generateJwt({
        sub: userId,
        type,
       }),
       type,
      
    };
  }
}
