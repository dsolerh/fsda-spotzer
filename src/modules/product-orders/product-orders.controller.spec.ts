import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductOrdersController } from './product-orders.controller';
import { ProductOrdersService } from './product-orders.service';

describe('ProductOrdersController Unit Test:', () => {
  let controller: ProductOrdersController;
  let spyService: ProductOrdersService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: ProductOrdersService,
      useFactory: () => ({
        create: jest.fn(() => ({})),
        getAll: jest.fn(() => ({})),
        getOneById: jest.fn(() => ({})),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductOrdersController],
      providers: [ProductOrdersService, ApiServiceProvider],
    }).compile();

    controller = module.get<ProductOrdersController>(ProductOrdersController);
    spyService = module.get<ProductOrdersService>(ProductOrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create something', async () => {
    const dto = new CreateOrderDto();
    const result = await controller.createOrder(dto);
    expect(result).not.toEqual(null);
  });

  it('should call create from ProductOrdersService', () => {
    const dto = new CreateOrderDto();
    controller.createOrder(dto);
    expect(spyService.create).toHaveBeenCalled();
    expect(spyService.create).toHaveBeenCalledWith(dto);
  });

  it('should call getAll from ProductOrdersService', () => {
    controller.getAll();
    expect(spyService.getAll).toHaveBeenCalled();
  });

  it('should call getOneById from ProductOrdersService', () => {
    controller.getOneById(1);
    expect(spyService.getOneById).toHaveBeenCalled();
  });
});
