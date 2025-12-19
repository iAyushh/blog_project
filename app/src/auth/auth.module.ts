import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports:[UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions:{expiresIn:'1d'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,PrismaService],
  exports:[AuthService],
})
export class AuthModule {}
