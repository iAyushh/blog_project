import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AuthenticatedUser, UserType } from 'src/common/types';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class BlogService {
    constructor(
        private readonly prisma:PrismaService){}
  async updateBlog(
    blogId: number,
    user: AuthenticatedUser,
    data: UpdateBlogDto,
  ) {

    const blog = await this.prisma.blog.findUnique({
        where:{id:blogId},
    });

    if(!blog){
        throw new NotFoundException()
    }

    if(user.type === UserType.ADMIN){
        return this.prisma.blog.update({
            where:{id:blogId},
            data,
        });
    }

    if(user.type === UserType.AUTHOR &&
        blog.authorId === user.id
    ){
        return this.prisma.blog.update({
            where: {id:blogId},
            data,
        });
    }

    throw new ForbiddenException()
  };
}
