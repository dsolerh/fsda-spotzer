import { Module } from '@nestjs/common';
import { ProductOrdersService } from './product-orders.service';
import { ProductOrdersController } from './product-orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './entity/order.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderRepository])],
  controllers: [ProductOrdersController],
  providers: [ProductOrdersService],
})
export class ProductOrdersModule {}
