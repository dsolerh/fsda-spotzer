import { CreateOrderDto } from '../../modules/product-orders/dto/create-order.dto';
import { OrderEntity } from '../../modules/product-orders/entity/order.entity';

class RepositoryMock {
  public static data: OrderEntity[] = [];
  async create(dto: CreateOrderDto): Promise<OrderEntity> {
    const record = new OrderEntity();
    for (const key in dto) {
      if (Object.prototype.hasOwnProperty.call(dto, key)) {
        record[key] = dto[key];
      }
    }
    RepositoryMock.data.push(record);
    return record;
  }
}

export class RepositoryMockBuilder {
  constructor(private repoMock: RepositoryMock = new RepositoryMock()) {}

  getRepo(): RepositoryMock {
    return this.repoMock;
  }

  clearRepo() {
    RepositoryMock.data = [];
  }
}
