import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './services/wallets.service';

@Module({
  imports: [],
  controllers: [WalletsController],
  providers: [WalletsService],
})
export class WalletsModule {}
