import { Test, TestingModule } from '@nestjs/testing';
import { readFile } from 'fs/promises';
import * as path from 'path';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductOrdersController } from './product-orders.controller';
import { ProductOrdersService } from './product-orders.service';

describe('ProductOrdersController Unit Test:', () => {
  let controller: ProductOrdersController;
  let spyService: ProductOrdersService;
  const examples = {};

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: ProductOrdersService,
      useFactory: () => ({
        create: jest.fn(() => ({})),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductOrdersController],
      providers: [ProductOrdersService, ApiServiceProvider],
    }).compile();

    controller = module.get<ProductOrdersController>(ProductOrdersController);
    spyService = module.get<ProductOrdersService>(ProductOrdersService);

    examples['valid'] = JSON.parse(
      await readFile(path.resolve('', 'assets', 'valid-orders.json')).then(
        (buff) => buff.toString(),
      ),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create something', () => {
    const dto = new CreateOrderDto();
    expect(controller.createOrder(dto)).not.toEqual(null);
  });

  it('should call create from ProductOrdersService', () => {
    const dto = new CreateOrderDto();
    controller.createOrder(dto);
    expect(spyService.create).toHaveBeenCalled();
    expect(spyService.create).toHaveBeenCalledWith(dto);
  });
});
