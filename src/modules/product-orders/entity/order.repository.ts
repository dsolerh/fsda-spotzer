import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { OrderEntity } from './order.entity';

@EntityRepository(OrderEntity)
export class OrderRepository extends Repository<OrderEntity> {
  protected logger = new Logger();
}
