import { Request } from 'express';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';


export class EnvironmentVariables {
}



export enum UserType {
  ADMIN = 'admin',
  AUTHOR = 'author',
  READER = 'reader',
}

export interface JwtPayload {
  readonly sub: number;
  readonly type: UserType;
}

export interface ValidatedUser {
  readonly id: number;
  readonly type: UserType;
}

export interface AuthenticatedUser {
  readonly id: number;
  readonly type: UserType;
}

export interface Context {
  readonly user: AuthenticatedUser;
}

export interface AuthenticatedRequest extends Request {
  readonly user: AuthenticatedUser;
}
