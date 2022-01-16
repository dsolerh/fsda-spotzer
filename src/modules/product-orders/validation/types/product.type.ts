import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumberString,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ProductTypeEnum } from '../../constants/product-type.enum';
import { ProductEntity } from '../../entity/product.entity';
import { PaidSearchProduct } from './paid-search-product.type';
import { WebsiteProduct } from './website-product.dto';

export class Product extends ProductEntity {
  @IsString()
  @IsNotEmpty()
  Category: string;
  @IsString()
  Notes: string;
  @IsNumberString()
  @IsNotEmpty()
  ProductID: string;
  @IsEnum(ProductTypeEnum)
  ProductType: ProductTypeEnum;

  @Type(() => PaidSearchProduct)
  @ValidateIf((o: Product) => o.ProductType == ProductTypeEnum.PAIDSEARCH)
  @IsNotEmptyObject()
  @ValidateNested()
  AdWordCampaign: PaidSearchProduct;

  @Type(() => WebsiteProduct)
  @ValidateIf((o: Product) => o.ProductType == ProductTypeEnum.WEBSITE)
  @IsNotEmptyObject()
  @ValidateNested()
  WebsiteDetails: WebsiteProduct;
}
