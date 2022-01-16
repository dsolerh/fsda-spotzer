import { transaction } from '../../../common/database/transaction';
import { ICommonRepository } from '../../../common/interfaces/common-repository.interface';
import { EntityRepository, QueryRunner, Repository } from 'typeorm';
import { ProductTypeEnum } from '../constants/product-type.enum';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderEntity } from './order.entity';
import { PaidSearchProductEntity } from './paid-search-product.entity';
import { ProductEntity } from './product.entity';
import { WebsiteProductEntity } from './website-product.entity';

@EntityRepository(OrderEntity)
export class OrderRepository
  extends Repository<OrderEntity>
  implements ICommonRepository<OrderEntity, CreateOrderDto>
{
  transactionalCreate(dto: CreateOrderDto): Promise<OrderEntity> {
    // lets now open a new transaction:
    return transaction<OrderEntity>(
      'Create an Order',
      async (q: QueryRunner) => {
        const order = await q.manager.save(q.manager.create(OrderEntity, dto));
        for (const productDto of dto.LineItems) {
          const product = await q.manager.save(
            q.manager.create(ProductEntity, {
              ...productDto,
              OrderId: order.id,
            }),
          );
          switch (productDto.ProductType) {
            case ProductTypeEnum.PAIDSEARCH:
              await q.manager.save(
                q.manager.create(PaidSearchProductEntity, {
                  ...product.AdWordCampaign,
                  ProductId: product.id,
                }),
              );
              break;

            case ProductTypeEnum.WEBSITE:
              await q.manager.save(
                q.manager.create(WebsiteProductEntity, {
                  ...productDto.WebsiteDetails,
                  ProductId: product.id,
                }),
              );
              break;
          }
        }

        return q.manager.findOneOrFail(OrderEntity, order.id);
      },
    );
  }
}
