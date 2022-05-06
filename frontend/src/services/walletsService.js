import axios from "axios"
import { configs } from "../config/vars"

export const addWallet = async (address, user) => {

    let url = `${configs.serverUrl}/users/${user._id}`
    const res = await axios.put(url, user)

    if(res.status === 200) {
        return Promise.resolve(res.data)
    }

}

export const getData = async (address) => {
    const promises = [getFirstTransaction(address), getBalance(address)]

    const [lastTransaction, balance] = await Promise.all(promises)
    const aYearAgo = getYearAgoTimestamp()
    let isOld = false
    
    if(parseInt(lastTransaction.timestamp) <= aYearAgo) {
        isOld = true
    }

    return Promise.resolve({ isOld, balance })
}

const getFirstTransaction = async (address) => {

    let url = `${configs.serverUrl}/wallets/first-transaction/${address}`
    const res = await axios.get(url)
    const transactions = res.data.result
    
    return Promise.resolve((transactions.length > 0) ? transactions[0] : null)

}

const getBalance = async (address) => {

    let url = `${configs.serverUrl}/wallets/balance/${address}`
    const res = await axios.get(url)
    const weiAmount = res.data.result

    return Promise.resolve(weiToEth(weiAmount))
}

const weiToEth = (weiAmount) => {
    return weiAmount / 1000000000000000000
}

const getYearAgoTimestamp = () => {
    const now = new Date()
    now.setYear(now.getFullYear() - 1)

    return now.getTime()
}