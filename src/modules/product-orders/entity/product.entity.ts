import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { CommonEntity } from '../../../common/models/common.entity';
import { ProductTypeEnum } from '../constants/product-type.enum';
import { OrderEntity } from './order.entity';
import { PaidSearchProductEntity } from './paid-search-product.entity';
import { WebsiteProductEntity } from './website-product.entity';

@Entity()
export class ProductEntity extends CommonEntity {
  @Column()
  ProductID: string;
  @Column({
    type: 'enum',
    enum: ProductTypeEnum,
    nullable: false,
  })
  ProductType: ProductTypeEnum;
  @Column()
  Notes: string;
  @Column()
  Category: string;

  @OneToOne(() => PaidSearchProductEntity, (ps) => ps.Product, { eager: true })
  AdWordCampaign: PaidSearchProductEntity;

  @OneToOne(() => WebsiteProductEntity, (ws) => ws.Product, { eager: true })
  WebsiteDetails: WebsiteProductEntity;

  @ManyToOne(() => OrderEntity, (o) => o.LineItems)
  @JoinColumn({ name: 'OrderId' })
  Order: OrderEntity;

  @Column()
  OrderId: number;
}
