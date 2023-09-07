import { Controller, Post, UseGuards, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BuyRequestsService } from './buy-requests.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BuyRequest } from './buy-request.entity';

@Controller('buy-requests')
@UseGuards(AuthGuard())
export class BuyRequestsController {
  constructor(private buyRequestsService: BuyRequestsService) {}

  @Post('/:bookId')
  createBuyRequest(
    @GetUser() user: User,
    @Param('bookId') bookId: string,
    @Body('requestMessage') requestMessage: string,
  ): Promise<BuyRequest> {
    return this.buyRequestsService.createBuyRequest(
      user,
      bookId,
      requestMessage,
    );
  }
}
