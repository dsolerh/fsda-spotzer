import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryMockBuilder } from '../../utils/testing/repository.mock';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductOrdersService } from './product-orders.service';
import { OrderRepository } from './entity/order.repository';
import { ProductOrdersServiceMockBuilder } from '../../utils/testing/service.mock';
import { OrderEntity } from './entity/order.entity';
import { ProductTypeEnum } from './constants/product-type.enum';

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
describe('ProductOrdersService [Test the repo]', () => {
  let service: ProductOrdersService;
  let sandbox: RepositoryMockBuilder;

  beforeEach(async () => {
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
  });

  /**
   * if the argument are right the service sould call the repo and persist the data
   * and then return an instance of the entity
   */
  it('should create a new record', async () => {
    const dto = {
      Partner: 'Partner A',
      OrderID: 'sample string 7',
      TypeOfOrder: 'sample string 8',
      SubmittedBy: 'sample string 11',
      CompanyID: 'sample string 28',
      CompanyName: 'sample string 29',
      LineItems: [
        {
          ID: 1,
          ProductID: '127',
          ProductType: ProductTypeEnum.WEBSITE,
          Notes: 'sample string 53',
          Category: 'sample string 245',
          WebsiteDetails: {
            TemplateId: 'sample string 245',
            WebsiteBusinessName: 'sample string 245',
            WebsiteAddressLine1: 'sample string 246',
            WebsiteAddressLine2: 'sample string 247',
            WebsiteCity: 'sample string 248',
            WebsiteState: 'sample string 249',
            WebsitePostCode: 'sample string 250',
            WebsitePhone: 'sample string 257',
            WebsiteEmail: 'sample string 258',
            WebsiteMobile: 'sample string 259',
          },
        },
      ],

      ExtraInfo: {
        __type: 'PA',
        ContactFirstName: 'Sample name',
        ContactLastName: 'Sample',
        ContactTitle: 'Sample',
        ContactPhone: 'Sample',
        ContactMobile: 'Sample',
        ContactEmail: 'Sample',
      },
    };
    const result = await service.create(new CreateOrderDto(dto));
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(OrderEntity);
    expect(sandbox.data).toContain(result);
  });

  it('sould return all records', async () => {
    const dto = {
      Partner: 'Partner A',
      OrderID: 'sample string 7',
      TypeOfOrder: 'sample string 8',
      SubmittedBy: 'sample string 11',
      CompanyID: 'sample string 28',
      CompanyName: 'sample string 29',
      LineItems: [
        {
          ID: 1,
          ProductID: '127',
          ProductType: ProductTypeEnum.WEBSITE,
          Notes: 'sample string 53',
          Category: 'sample string 245',
          WebsiteDetails: {
            TemplateId: 'sample string 245',
            WebsiteBusinessName: 'sample string 245',
            WebsiteAddressLine1: 'sample string 246',
            WebsiteAddressLine2: 'sample string 247',
            WebsiteCity: 'sample string 248',
            WebsiteState: 'sample string 249',
            WebsitePostCode: 'sample string 250',
            WebsitePhone: 'sample string 257',
            WebsiteEmail: 'sample string 258',
            WebsiteMobile: 'sample string 259',
          },
        },
      ],

      ExtraInfo: {
        __type: 'PA',
        ContactFirstName: 'Sample name',
        ContactLastName: 'Sample',
        ContactTitle: 'Sample',
        ContactPhone: 'Sample',
        ContactMobile: 'Sample',
        ContactEmail: 'Sample',
      },
    };
    await service.create(new CreateOrderDto(dto));
    await service.create(new CreateOrderDto(dto));
    await service.create(new CreateOrderDto(dto));

    const result = await service.getAll();
    expect(result).toBeDefined();
    expect(result.length).toEqual(3);
  });

  afterEach(async () => {
    sandbox.clearRepo();
  });
});
