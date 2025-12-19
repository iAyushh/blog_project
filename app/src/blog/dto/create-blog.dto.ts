import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  content: string;
}
