import { ICommonRepository } from 'src/common/interfaces/common-repository.interface';
import { CreateOrderDto } from '../../modules/product-orders/dto/create-order.dto';
import { OrderEntity } from '../../modules/product-orders/entity/order.entity';

class RepositoryMock implements ICommonRepository<OrderEntity, CreateOrderDto> {
  public static data: OrderEntity[] = [];

  async transactionalCreate(dto: CreateOrderDto): Promise<OrderEntity> {
    const record = new OrderEntity(dto);
    RepositoryMock.data.push(record);
    return record;
  }
}

export class RepositoryMockBuilder {
  constructor(private repoMock: RepositoryMock = new RepositoryMock()) {}

  getRepo(): RepositoryMock {
    return this.repoMock;
  }

  public get data(): OrderEntity[] {
    return RepositoryMock.data;
  }

  clearRepo() {
    RepositoryMock.data = [];
  }
}
