import { Book } from 'src/books/book.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { BuyRequest } from 'src/buy-requests/buy-request.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsNotEmpty()
  username: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => Book, (book) => book.user, { eager: true })
  books: Book[];

  @OneToMany(() => BuyRequest, (buyRequest) => buyRequest.user, { eager: true })
  buyRequests: BuyRequest[];
}
