import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { OrderEntity } from './entity/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './entity/order.repository';

@Injectable()
export class ProductOrdersService {
  protected logger: Logger;
  constructor(private readonly repo: OrderRepository) {
    this.logger = new Logger();
  }
  async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    try {
      await validateOrReject(createOrderDto);
    } catch (errors) {
      this.logger.error('(validation failed). Errors: ', errors);
      throw new BadRequestException(errors);
    }
    return this.repo.create(createOrderDto);
  }
}
