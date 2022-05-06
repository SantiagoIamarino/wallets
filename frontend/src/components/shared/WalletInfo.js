import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export const WalletInfo = ({ walletInfo, setWalletInfo }) => {

    const currencyRates = useSelector(state => state.rates)
    const [currency, setCurrency]  = useState('USD')
  
    const changeCurrency = (newCurrency) => {

        setCurrency(newCurrency)
  
        const currencyRate = currencyRates[newCurrency.toLowerCase()]
        const currencyConversion = currencyRate * walletInfo.balance
  
        setWalletInfo({ ...walletInfo, currencyConversion })
  
    }

  return (
    <div>
        <div className='wallet-info'>
            <div className="row">
                <div className="col-6 balance mt-2">
                    <h6 className="text-center">
                        Balance
                    </h6>
                    <p className="text-center">
                        { walletInfo.balance } ETH
                    </p>
                </div>
                <div className="col-6">
                    <div className="row">
                        <div className="col-6">
                            <p className='text-center mt-4'>
                                ~{ walletInfo.currencyConversion.toFixed(2) } 
                                {currency}
                            </p>
                        </div>
                        <div className="col-6">
                            <label >Currency</label>
                            <select onChange={ e => changeCurrency(e.target.value)}
                                value={currency} className='form-control'>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
