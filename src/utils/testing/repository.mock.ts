import { ICommonRepository } from 'src/common/interfaces/common-repository.interface';
import { FindManyOptions } from 'typeorm';
import { CreateOrderDto } from '../../modules/product-orders/dto/create-order.dto';
import { OrderEntity } from '../../modules/product-orders/entity/order.entity';

class RepositoryMock implements ICommonRepository<OrderEntity, CreateOrderDto> {
  public data: OrderEntity[] = [];

  async find(options?: FindManyOptions<any>): Promise<OrderEntity[]> {
    return this.data;
  }

  async transactionalCreate(dto: CreateOrderDto): Promise<OrderEntity> {
    const record = new OrderEntity(dto);
    this.data.push(record);
    return record;
  }
}

export class RepositoryMockBuilder {
  constructor(private repoMock: RepositoryMock = new RepositoryMock()) {}

  getRepo(): RepositoryMock {
    return this.repoMock;
  }

  public get data(): OrderEntity[] {
    return this.repoMock.data;
  }

  clearRepo() {
    this.repoMock.data = [];
  }
}
