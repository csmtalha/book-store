import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyRequestsService } from './buy-requests.service';
import { BuyRequest } from './buy-request.entity';
import { BuyRequestsController } from './buy-requests.controller';
import { AdminBuyRequestsController } from './admin-buy-requests.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BuyRequest]), AuthModule],
  providers: [BuyRequestsService],
  controllers: [BuyRequestsController, AdminBuyRequestsController],
  exports: [BuyRequestsService],
})
export class BuyRequestsModule {}
