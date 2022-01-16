import { IsNotEmpty, IsString } from 'class-validator';
import { WebsiteProductEntity } from '../../entity/website-product.entity';

export class WebsiteProduct extends WebsiteProductEntity {
  @IsString()
  @IsNotEmpty()
  TemplateId: string;
  @IsString()
  @IsNotEmpty()
  WebsiteAddressLine1: string;
  @IsString()
  @IsNotEmpty()
  WebsiteAddressLine2: string;
  @IsString()
  @IsNotEmpty()
  WebsiteBusinessName: string;
  @IsString()
  @IsNotEmpty()
  WebsiteCity: string;
  @IsString()
  @IsNotEmpty()
  WebsiteEmail: string;
  @IsString()
  @IsNotEmpty()
  WebsiteMobile: string;
  @IsString()
  @IsNotEmpty()
  WebsitePhone: string;
  @IsString()
  @IsNotEmpty()
  WebsitePostCode: string;
  @IsString()
  @IsNotEmpty()
  WebsiteState: string;
}
