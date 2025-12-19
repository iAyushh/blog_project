import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthenticatedUser, UserType } from 'src/common/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBlogDto, UpdateBlogDto } from './dto';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBlogs() {
    return this.prisma.blog.findMany({
      include: {
        author: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getBlogById(id: number) {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
          },
        },
      },
    });

    if (!blog) {
      throw new NotFoundException();
    }

    return blog;
  }

  async createBlog(user: AuthenticatedUser, dto: CreateBlogDto) {
    return this.prisma.blog.create({
      data: {
        title: dto.title,
        content: dto.content,
        authorId: user.id,
      },
    });
  }

  async updateBlog(
    blogId: number,
    user: AuthenticatedUser,
    data: UpdateBlogDto,
  ) {
    const blog = await this.prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      throw new NotFoundException();
    }

    if (user.type === UserType.ADMIN) {
      return this.prisma.blog.update({
        where: { id: blogId },
        data,
      });
    }

    if (user.type === UserType.AUTHOR && blog.authorId === user.id) {
      return this.prisma.blog.update({
        where: { id: blogId },
        data,
      });
    }

    throw new ForbiddenException();
  }

  async deleteBlog(blogId: number) {

    const blog = await this.prisma.blog.findUnique({
      where:{id:blogId},
  });

  if(!blog){
    throw new NotFoundException()
  }

  return this.prisma.blog.delete({
    where:{id:blogId},
  });
  }
}
