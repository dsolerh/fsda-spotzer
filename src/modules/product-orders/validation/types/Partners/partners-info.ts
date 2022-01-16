import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class PartnerAInfo {
  @IsString()
  @IsNotEmpty()
  ContactFirstName: string;
  @IsString()
  @IsNotEmpty()
  ContactLastName: string;
  @IsString()
  @IsNotEmpty()
  ContactTitle: string;
  @IsString()
  @IsNotEmpty()
  ContactPhone: string;
  @IsString()
  @IsNotEmpty()
  ContactMobile: string;
  @IsString()
  @IsNotEmpty()
  ContactEmail: string;
}

export class PartnerCInfo {
  @IsString()
  @IsNotEmpty()
  ExposureID: string;
  @IsString()
  @IsNotEmpty()
  UDAC: string;
  @IsString()
  @IsNotEmpty()
  RelatedOrder: string;
}

export class NoInfo {}
