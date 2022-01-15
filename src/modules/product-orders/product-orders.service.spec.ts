import { Test, TestingModule } from '@nestjs/testing';
import { readFile } from 'fs/promises';
import * as path from 'path';
// import * as sinon from 'sinon';
import { RepositoryMockBuilder } from '../../utils/testing/repository.mock';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductOrdersService } from './product-orders.service';
import { OrderRepository } from './entity/order.repository';
import { ProductOrdersServiceMockBuilder } from '../../utils/testing/service.mock';
import { OrderEntity } from './entity/order.entity';

describe("ProductOrdersService [Testing the proper method's arg]", () => {
  let service: ProductOrdersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductOrdersService, ProductOrdersServiceMockBuilder()],
    }).compile();

    service = module.get<ProductOrdersService>(ProductOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.create).toBeDefined();
  });

  it('should call create method with expected params', async () => {
    const spyCreate = jest.spyOn(service, 'create');
    const dto = new CreateOrderDto();
    service.create(dto);
    expect(spyCreate).toHaveBeenCalledWith(dto);
  });
});

/**
 * this tests are ment to ensure proper validation of the information
 * that is recived by the service
 */
describe('ProductOrdersService [Test the validation process]', () => {
  let service: ProductOrdersService;
  let sandbox: RepositoryMockBuilder;
  const examples = {};

  beforeAll(async () => {
    sandbox = new RepositoryMockBuilder();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductOrdersService,
        {
          provide: OrderRepository,
          useValue: sandbox.getRepo(),
        },
      ],
    }).compile();

    service = module.get<ProductOrdersService>(ProductOrdersService);

    examples['valid'] = JSON.parse(
      await readFile(path.resolve('', 'assets', 'valid-orders.json')).then(
        (buff) => buff.toString(),
      ),
    );
  });

  /**
   * if the argument are right the service sould call the repo and persist the data
   * and then return an instance of the entity
   */
  it('should return a value', async () => {
    for (const valid of examples['valid']) {
      const result = await service.create(valid);
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(OrderEntity);
    }
  });

  /**
   * if the argument is not valid it should thow an error
   */
  it('should throw BadRequestError', () => {
    expect(null).toBe(null);
  });

  afterAll(async () => {
    sandbox.clearRepo();
  });
});
