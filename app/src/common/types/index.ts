import { Request } from 'express';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { UserRole } from 'generated/prisma/enums';


export class EnvironmentVariables {
}



export enum UserType {
  ADMIN = 'admin',
  AUTHOR = 'author',
  READER = 'reader',
}

export interface JwtPayload {
  readonly sub: number;
  readonly type: UserRole;
}

export interface ValidatedUser {
  readonly id: number;
  readonly type: UserRole;
}

export interface AuthenticatedUser {
  readonly id: number;
  readonly type: UserRole;
}

export interface Context {
  readonly user: AuthenticatedUser;
}

export interface AuthenticatedRequest extends Request {
  readonly user: AuthenticatedUser;
}
