import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { ProductsController } from './controllers/products.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
