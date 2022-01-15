import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './common/config/config-service';
import { ProductOrdersModule } from './modules/product-orders/product-orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeORMConfig()),
    ProductOrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
