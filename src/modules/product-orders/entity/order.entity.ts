import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../../common/models/common.entity';

@Entity()
export class OrderEntity extends CommonEntity {
  @PrimaryGeneratedColumn({
    comment: 'this is the Primary Column for this table',
  })
  public OrderId: number;
  @Column()
  public Partner: string;
  @Column()
  public TypeOfOrder: string;
  @Column()
  public SubmittedBy: string;
  @Column()
  public CompanyID: number;
  @Column()
  public CompanyName: string;
}
