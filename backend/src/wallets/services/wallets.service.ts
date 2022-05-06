import { Injectable } from '@nestjs/common';
import axios from 'axios';
import configs from '../../configs/vars'

@Injectable()
export class WalletsService {

    async getBalance(address) {

        let url = "https://api.etherscan.io/api"
        url += "?module=account&action=balance"
        url += `&address=${address}`
        url += `&tag=latest&apikey=${configs.ethApiKey}`
        
        const res = await axios.get(url)
        return res.data

    }
    
    async getFirstTransaction(address) {

        let url = "https://api.etherscan.io/api"
        url += "?module=account&action=txlist"
        url += `&address=${address}&startblock=0&endblock=99999999&page=1`
        url += `&offset=1&sort=asc&apikey=${configs.ethApiKey}`

        const res = await axios.get(url)

        return res.data
    }
    

}
