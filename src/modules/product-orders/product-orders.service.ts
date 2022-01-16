import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { OrderEntity } from './entity/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './entity/order.repository';
import { plainToClass } from 'class-transformer';
import { isNotEmpty, validateOrReject } from 'class-validator';
import { ProductTypeEnum } from './constants/product-type.enum';

@Injectable()
export class ProductOrdersService {
  protected logger = new Logger();
  constructor(private readonly repo: OrderRepository) {}
  async create(dto: CreateOrderDto): Promise<OrderEntity> {
    let order: OrderEntity;
    try {
      dto = await this.validateDto(dto);
    } catch (errors) {
      this.logger.error('(Validation failed). Errors: ', errors);
      throw new BadRequestException(errors);
    }
    try {
      order = await this.repo.transactionalCreate(dto);
    } catch (errors) {
      this.logger.error('(Creation failed). Errors: ', errors);
      throw new InternalServerErrorException(errors);
    }
    return order;
  }

  async getAll(): Promise<OrderEntity[]> {
    return this.repo.find();
  }

  async getOneById(id: number) {
    return this.repo.findOne(id);
  }

  private async validateDto(rawDto: any): Promise<CreateOrderDto> {
    const dto = plainToClass(CreateOrderDto, rawDto);
    await validateOrReject(dto);
    for (const product of dto.LineItems) {
      if (
        product.ProductType === ProductTypeEnum.PAIDSEARCH &&
        isNotEmpty(product.WebsiteDetails)
      ) {
        throw new BadRequestException(
          `Invalid argument 'WebsiteDetails' for a Product with 'ProductType'=${product.ProductType}`,
        );
      }
      if (
        product.ProductType === ProductTypeEnum.WEBSITE &&
        isNotEmpty(product.AdWordCampaign)
      ) {
        throw new BadRequestException(
          `Invalid argument 'AdWordCampaign' for a Product with 'ProductType'=${product.ProductType}`,
        );
      }
    }
    return dto;
  }
}
