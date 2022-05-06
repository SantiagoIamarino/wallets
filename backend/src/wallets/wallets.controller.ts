import { Controller, Get, Param } from '@nestjs/common';
import { WalletsService } from './services/wallets.service';

@Controller('wallets')
export class WalletsController {

    constructor(private readonly walletsService: WalletsService) {}

    @Get('balance/:address')
    async getBalance( @Param('address') address ) {
        return this.walletsService.getBalance(address)
    }

    @Get('first-transaction/:address')
    async getFirstTransaction(@Param('address') address) {
        return this.walletsService.getFirstTransaction(address)
    }

}
