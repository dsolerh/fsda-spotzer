import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Product } from '../validation/types/product.type';
import { OrderEntity } from '../entity/order.entity';
import {
  NoInfo,
  PartnerAInfo,
  PartnerCInfo,
} from '../validation/types/Partners/partners-info';
import { CantBeInstanceOf } from '../validation/utils/validate-instance-of';

export class CreateOrderDto extends OrderEntity {
  @IsString()
  @IsNotEmpty()
  OrderID: string;
  @IsString()
  @IsNotEmpty()
  Partner: string;
  @IsString()
  @IsNotEmpty()
  TypeOfOrder: string;
  @IsString()
  @IsNotEmpty()
  SubmittedBy: string;
  @IsString()
  @IsNotEmpty()
  CompanyID: string;
  @IsString()
  @IsNotEmpty()
  CompanyName: string;

  @Type(() => Product)
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  LineItems: Product[];

  @Type(() => NoInfo, {
    discriminator: {
      property: '__type',
      subTypes: [
        { value: PartnerAInfo, name: 'PA' },
        { value: PartnerCInfo, name: 'PC' },
      ],
    },
  })
  @Validate(CantBeInstanceOf, [NoInfo])
  @IsOptional()
  @ValidateNested()
  ExtraInfo: PartnerCInfo | PartnerAInfo | NoInfo;
}
