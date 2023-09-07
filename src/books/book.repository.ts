import { EntityRepository, Repository, getManager } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from 'src/books/DTO/create-book.dto';
import { User } from 'src/auth/user.entity';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async getBooks(user: User): Promise<Book[]> {
    const query = this.createQueryBuilder('book');
    query.where({ user });
    const books = await query.getMany();
    return books;
  }

  async createBook(createBookDto: CreateBookDto, user: User): Promise<Book> {
    const bookRepository: Repository<Book> = getManager().getRepository(Book);
    const { title, author, publishedYear, price, stock } = createBookDto;

    const book = new Book();
    book.title = title;
    book.author = author;
    book.publishedYear = publishedYear;
    book.price = price;
    book.stock = stock;
    book.user = user;
    await bookRepository.save(book);
    return book;
  }
}
