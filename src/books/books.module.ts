import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity'; // Make sure this import is correct
import { BookRepository } from './book.repository'; // Make sure this import is correct
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookRepository]), AuthModule],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
