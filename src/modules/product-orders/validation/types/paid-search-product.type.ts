import { IsNotEmpty, IsString } from 'class-validator';
import { PaidSearchProductEntity } from '../../entity/paid-search-product.entity';

export class PaidSearchProduct extends PaidSearchProductEntity {
  @IsString()
  @IsNotEmpty()
  CampaignAddressLine1: string;
  @IsString()
  @IsNotEmpty()
  CampaignName: string;
  @IsString()
  @IsNotEmpty()
  CampaignPostCode: string;
  @IsString()
  @IsNotEmpty()
  CampaignRadius: string;
  @IsString()
  @IsNotEmpty()
  DestinationURL: string;
  @IsString()
  @IsNotEmpty()
  LeadPhoneNumber: string;
  @IsString()
  @IsNotEmpty()
  Offer: string;
  @IsString()
  @IsNotEmpty()
  SMSPhoneNumber: string;
  @IsString()
  @IsNotEmpty()
  UniqueSellingPoint1: string;
  @IsString()
  @IsNotEmpty()
  UniqueSellingPoint2: string;
  @IsString()
  @IsNotEmpty()
  UniqueSellingPoint3: string;
}
