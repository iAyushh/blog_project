import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "src/auth";



@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private readonly authService: AuthService){}
  async canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
     try{
      const  request = context.switchToHttp().getRequest();
     }
    catch(error){
      throw new UnauthorizedException()
    }
  }
}