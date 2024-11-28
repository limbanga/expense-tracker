import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';



@Module({
  imports: [
    ConfigModule.forRoot(), // Đọc file .env
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_PATH || 'database.sqlite', // Đường dẫn file SQLite
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Đường dẫn tới các entity
      synchronize: true, // Chỉ nên bật trong môi trường phát triển
    }),
    // Đăng ký các modules
    UsersModule, 
    AuthModule, 
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}