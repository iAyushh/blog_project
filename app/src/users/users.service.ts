import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidatedUser } from 'src/common/types';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  
   async comparePassword(plain:string,hash?:string|null):Promise<Boolean>{

    if(!hash) return false;
    return bcrypt.compare(plain,hash);
      
    }

  
  async validateUserByEmail(email:string, password: string):Promise<ValidatedUser|false|null> {
    const user = await this.prisma.user.findUnique({where:{email},
    include:{
        userMeta:true,
        
    }})

    if(!user||!user.userMeta){
        return null;
    }
    
    const isValid = await this.comparePassword(
        password,
        user.userMeta.passwordHash,
    );
    if(!isValid){
        return false;
    }
    return {
        id: user.id,
        type:user.role
    };
}}
