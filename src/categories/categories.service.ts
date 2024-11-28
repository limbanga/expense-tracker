import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }

  // Lấy tất cả các danh mục
  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  // Tạo mới một danh mục
  async create(name: string, description?: string): Promise<Category> {
    const category = this.categoryRepository.create({ name, description });
    return this.categoryRepository.save(category);
  }

  // Lấy một danh mục theo id
  async findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOneBy({ id });
  }

  // Cập nhật danh mục
  async update(id: number, name: string, description?: string): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    category.name = name;
    category.description = description;
    return this.categoryRepository.save(category);
  }

  // Xóa danh mục
  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
