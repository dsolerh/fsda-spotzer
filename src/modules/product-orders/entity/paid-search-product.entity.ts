import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CommonEntity } from '../../../common/models/common.entity';
import { ProductEntity } from './product.entity';

@Entity()
export class PaidSearchProductEntity extends CommonEntity {
  @Column()
  CampaignName: string;
  @Column()
  CampaignAddressLine1: string;
  @Column()
  CampaignPostCode: string;
  @Column()
  CampaignRadius: string;
  @Column()
  LeadPhoneNumber: string;
  @Column()
  SMSPhoneNumber: string;
  @Column()
  UniqueSellingPoint1: string;
  @Column()
  UniqueSellingPoint2: string;
  @Column()
  UniqueSellingPoint3: string;
  @Column()
  Offer: string;
  @Column()
  DestinationURL: string;

  @OneToOne(() => ProductEntity, (p) => p.AdWordCampaign)
  @JoinColumn({ name: 'ProductId' })
  Product: ProductEntity;

  @Column({ nullable: true })
  ProductId: number;
}
