import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Book } from 'src/books/book.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class BuyRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  requestMessage: string;

  @Column()
  bookId: string;

  @ManyToOne(() => User, (user) => user.buyRequests, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  @Column({ default: false })
  accepted: boolean;

  @ManyToOne(() => Book, (book) => book.buyRequests, { eager: false })
  book: Book;
}
