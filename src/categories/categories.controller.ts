// src/categories/category.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoriesService) {}

  // Lấy tất cả danh mục
  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  // Tạo mới danh mục
  @Post()
  async create(@Body() body: { name: string; description?: string }): Promise<Category> {
    return this.categoryService.create(body.name, body.description);
  }

  // Lấy một danh mục theo id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  // Cập nhật danh mục
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: { name: string; description?: string },
  ): Promise<Category> {
    return this.categoryService.update(id, body.name, body.description);
  }

  // Xóa danh mục
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.categoryService.remove(id);
  }
}
