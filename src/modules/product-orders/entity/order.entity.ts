import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from '../../../common/models/common.entity';
import {
  NoInfo,
  PartnerAInfo,
  PartnerCInfo,
} from '../validation/types/Partners/partners-info';
import { ProductEntity } from './product.entity';

@Entity()
export class OrderEntity extends CommonEntity {
  @Column()
  OrderID: string;
  @Column()
  Partner: string;
  @Column()
  TypeOfOrder: string;
  @Column()
  SubmittedBy: string;
  @Column()
  CompanyID: string;
  @Column()
  CompanyName: string;

  @OneToMany(() => ProductEntity, (p) => p.Order, { eager: true })
  LineItems: ProductEntity[];

  @Column({ type: 'simple-json', nullable: true })
  ExtraInfo: PartnerCInfo | PartnerAInfo | NoInfo;
}
