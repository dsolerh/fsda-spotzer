import { OrderEntity } from '../../product-orders/entity/order.entity';
import { CreateOrderDto } from '../../modules/product-orders/dto/create-order.dto';
import { ProductOrdersService } from '../../modules/product-orders/product-orders.service';

class ProductOrdersServiceMock {
  async create(dto: CreateOrderDto): Promise<OrderEntity> {
    return new OrderEntity();
  }
}

export const ProductOrdersServiceMockBuilder = () => {
  return {
    provide: ProductOrdersService,
    useClass: ProductOrdersServiceMock,
  };
};
