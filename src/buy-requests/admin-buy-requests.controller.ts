import { Controller, Get, UseGuards, Param, Put } from '@nestjs/common';
import { RolesGuard } from 'src/gaurds/roles.gaurd';
import { UserRole } from 'src/enums/user-role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { BuyRequestsService } from './buy-requests.service';
import { BuyRequest } from './buy-request.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin/buy-requests')
@UseGuards(AuthGuard(), RolesGuard)
export class AdminBuyRequestsController {
  constructor(private buyRequestsService: BuyRequestsService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  getAllBuyRequests(): Promise<BuyRequest[]> {
    return this.buyRequestsService.getAllBuyRequests();
  }

  @Put('/:id/accept')
  @Roles(UserRole.ADMIN)
  acceptBuyRequest(@Param('id') buyRequestId: string): Promise<BuyRequest> {
    return this.buyRequestsService.acceptBuyRequest(buyRequestId);
  }
}
