import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateBlogDto {
  @IsOptional()
  @IsString()
  @MinLength(5)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(20)
  content?: string;
}
