import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/auth/user.entity';
import { BuyRequest } from 'src/buy-requests/buy-request.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  author: string;

  @Column()
  @IsNotEmpty()
  publishedYear: number;

  @Column('decimal')
  @IsNotEmpty()
  price: number;

  @Column()
  @IsNotEmpty()
  stock: number;

  @ManyToOne(() => User, (user) => user.books, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  @OneToMany(() => BuyRequest, (buyRequest) => buyRequest.book)
  buyRequests: BuyRequest[];
}
