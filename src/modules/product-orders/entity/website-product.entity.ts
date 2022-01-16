import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CommonEntity } from '../../../common/models/common.entity';
import { ProductEntity } from './product.entity';

@Entity()
export class WebsiteProductEntity extends CommonEntity {
  @Column()
  TemplateId: string;
  @Column()
  WebsiteBusinessName: string;
  @Column()
  WebsiteAddressLine1: string;
  @Column()
  WebsiteAddressLine2: string;
  @Column()
  WebsiteCity: string;
  @Column()
  WebsiteState: string;
  @Column()
  WebsitePostCode: string;
  @Column()
  WebsitePhone: string;
  @Column()
  WebsiteEmail: string;
  @Column()
  WebsiteMobile: string;

  @OneToOne(() => ProductEntity, (p) => p.WebsiteDetails)
  @JoinColumn({ name: 'ProductId' })
  Product: ProductEntity;

  @Column({ nullable: true })
  ProductId: number;
}
