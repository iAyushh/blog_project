import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import {type AuthenticatedRequest, UserType } from 'src/common/types';
import { CreateBlogDto, UpdateBlogDto } from './dto';
import { BlogService } from './blog.service';



@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @Get(':id')
  getBlogById(@Param('id') id: number) {
    return this.blogService.getBlogById(id);
  }

  @Roles(UserType.ADMIN, UserType.AUTHOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createBlog(@Body() dto: CreateBlogDto, @Req() req: AuthenticatedRequest) {
    return this.blogService.createBlog(req.user, dto);
  }

  @Roles(UserType.ADMIN, UserType.AUTHOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  updateBlog(
    @Param('id') id: number,
    @Body() dto: UpdateBlogDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.blogService.updateBlog(id, req.user, dto);
  }

  @Roles(UserType.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deleteBlog(
    @Param('id') id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.blogService.deleteBlog(id);
  }
}
