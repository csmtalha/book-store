import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books/book.entity';
import { AuthModule } from './auth/auth.module';
import { Reflector } from '@nestjs/core';
import { BuyRequestsController } from './buy-requests/buy-requests.controller';
import { BuyRequestsModule } from './buy-requests/buy-requests.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    BooksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres123',
      database: 'book_store',
      entities: [Book],
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    BuyRequestsModule,
    PaymentModule,
  ],
  providers: [Reflector],
  controllers: [BuyRequestsController],
})
export class AppModule {}
