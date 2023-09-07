import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyRequest } from './buy-request.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BuyRequestsService {
  constructor(
    @InjectRepository(BuyRequest)
    private buyRequestRepository: Repository<BuyRequest>,
  ) {}

  async createBuyRequest(data: any): Promise<BuyRequest[]> {
    const newBuyRequest = this.buyRequestRepository.create(data);
    return this.buyRequestRepository.save(newBuyRequest);
  }

  async getBuyRequestById(id: string): Promise<BuyRequest> {
    return this.buyRequestRepository.findOne(id);
  }

  async getAllBuyRequests(): Promise<BuyRequest[]> {
    return this.buyRequestRepository.find();
  }

  async acceptBuyRequest(buyRequestId: string): Promise<BuyRequest> {
    const buyRequest = await this.buyRequestRepository.findOne(buyRequestId);

    if (!buyRequest) {
      throw new NotFoundException('Buy request not found');
    }

    if (buyRequest.accepted) {
      throw new BadRequestException('Buy request is already accepted');
    }

    buyRequest.accepted = true;
    return this.buyRequestRepository.save(buyRequest);
  }

  async deleteBuyRequest(buyRequestId: string): Promise<void> {
    const result = await this.buyRequestRepository.delete(buyRequestId);
    if (result.affected === 0) {
      throw new NotFoundException('Buy request not found');
    }
  }
}
