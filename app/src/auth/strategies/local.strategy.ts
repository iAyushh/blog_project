import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { ValidatedUser } from "src/common/types";
import { UsersService } from "src/users";
import { AuthService } from "../auth.service";



export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly userService: UsersService){
        super({
            usernameField:'email',
            passwordField:'password'
        }) 
    }
    async validate(email:string, password: string): Promise <ValidatedUser> {
      
     const user = await this.userService.validateUserByEmail(email, password);
     
     if(!user){
        throw new UnauthorizedException()
     }
     return user;
     
    }

}