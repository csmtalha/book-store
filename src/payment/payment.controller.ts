import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentRequestBody } from './interfaces/PaymentRequestBody';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  createPayments(@Body() paymentRequestBody: PaymentRequestBody) {
    this.paymentService.createPayment(paymentRequestBody);
  }
}
