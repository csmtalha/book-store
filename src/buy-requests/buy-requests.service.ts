import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuyRequest } from './buy-request.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BuyRequestsService {
  constructor(
    @InjectRepository(BuyRequest)
    private buyRequestRepository: Repository<BuyRequest>,
  ) {}

  async createBuyRequest(
    user: User,
    bookId: string,
    requestMessage: string,
  ): Promise<BuyRequest> {
    const buyRequest = new BuyRequest();
    buyRequest.bookId = bookId;
    buyRequest.user = user;
    buyRequest.requestMessage = requestMessage;
    return this.buyRequestRepository.save(buyRequest);
  }

  async getAllBuyRequests(): Promise<BuyRequest[]> {
    return this.buyRequestRepository.find();
  }

  async acceptBuyRequest(buyRequestId: string): Promise<BuyRequest> {
    const buyRequest = await this.buyRequestRepository.findOne(buyRequestId);

    if (!buyRequest) {
      throw new NotFoundException('Buy request not found');
    }

    buyRequest.accepted = true;
    return this.buyRequestRepository.save(buyRequest);
  }
}
