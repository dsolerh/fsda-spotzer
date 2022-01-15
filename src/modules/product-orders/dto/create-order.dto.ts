import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OrderEntity } from '../entity/order.entity';

export class CreateOrderDto extends OrderEntity {
  @IsEmpty()
  public OrderId: number;
  @IsString()
  @IsNotEmpty()
  public Partner: string;
  @IsString()
  @IsNotEmpty()
  public TypeOfOrder: string;
  @IsString()
  @IsNotEmpty()
  public SubmittedBy: string;
  @IsNumber()
  public CompanyID: number;
  @IsString()
  @IsNotEmpty()
  public CompanyName: string;
}
