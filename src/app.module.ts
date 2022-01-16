import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './common/config/config-service';
import { ProductOrdersModule } from './modules/product-orders/product-orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeORMConfig()),
    ProductOrdersModule,
  ],
})
export class AppModule {}
