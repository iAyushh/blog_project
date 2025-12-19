import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies';
import { jwtConfigFactory } from 'src/configs';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfigFactory]
    
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtStrategy],
})
export class CommonModule {}
