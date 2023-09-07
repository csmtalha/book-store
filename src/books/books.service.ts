import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { Book } from './book.entity';
import { CreateBookDto } from 'src/books/DTO/create-book.dto';
import { UpdateBookDto } from 'src/books/DTO/update-book.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly booksRepository: BookRepository,
  ) {}
  async getBookById(id: string, user: User): Promise<Book> {
    const found = await this.booksRepository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }
  async getBooks(user: User): Promise<Book[]> {
    const books = await this.booksRepository.find({ where: { user } });
    return books;
  }

  async createBook(createBookDto: CreateBookDto, user: User): Promise<Book> {
    return await this.booksRepository.createBook(createBookDto, user);
  }

  async updateBook(
    id: string,
    updateBookDto: UpdateBookDto,
    user: User,
  ): Promise<Book> {
    const book = await this.getBookById(id, user);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const { title, author, publishedYear, price, stock } = updateBookDto;
    book.title = title;
    book.author = author;
    book.publishedYear = publishedYear;
    book.price = price;
    book.stock = stock;

    await this.booksRepository.save(book);

    return book;
  }

  async removebook(id: string, user: User): Promise<void> {
    const book = await this.getBookById(id, user);
    await this.booksRepository.delete(book);
  }
}
