import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './entity/order.entity';
import { ProductOrdersService } from './product-orders.service';

@Controller('product-orders')
export class ProductOrdersController {
  protected logger = new Logger();
  constructor(private readonly service: ProductOrdersService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    return this.service.create(createOrderDto);
  }

  @Get()
  getAll(): Promise<OrderEntity[]> {
    return this.service.getAll();
  }

  @Get('/:id')
  getOneById(@Param('id', ParseIntPipe) id: number): Promise<OrderEntity> {
    return this.service.getOneById(id);
  }
}
