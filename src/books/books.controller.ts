import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from 'src/books/DTO/create-book.dto';
import { Book } from './book.entity';
import { UpdateBookDto } from 'src/books/DTO/update-book.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { RolesGuard } from 'src/gaurds/roles.gaurd';
import { UserRole } from 'src/enums/user-role.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('books')
@UseGuards(AuthGuard(), RolesGuard)
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get(':id')
  getBookById(@Param('id') id: string, @GetUser() user: User): Promise<Book> {
    return this.booksService.getBookById(id, user);
  }

  @Get()
  getBooks(@GetUser() user: User): Promise<Book[]> {
    return this.booksService.getBooks(user);
  }

  @Post('create-book')
  @Roles(UserRole.ADMIN)
  createBook(@Body() createBookDto: CreateBookDto, @GetUser() user: User) {
    return this.booksService.createBook(createBookDto, user);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @GetUser() user: User,
  ): Promise<Book> {
    return this.booksService.updateBook(id, updateBookDto, user);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async removeBook(@Param('id') id: string, @GetUser() user: User) {
    return this.booksService.removebook(id, user);
  }
}
