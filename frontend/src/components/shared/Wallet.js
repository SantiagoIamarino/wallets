import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getData } from '../../services/walletsService'
import { Loading } from './Loading'
import { ToggleFavorite } from './ToggleFavorite'
import { WalletInfo } from './WalletInfo'

export const Wallet = ({ address, isFavorite }) => {
  
  const [walletInfo, setWalletInfo]  = useState(null)
  const [noCurrencyRates, setNoCurrencyRates]  = useState(false)
  const [ isOldWallet, setIsOldWallet ] = useState(false)
  const [loading, setLoading]  = useState(false)

  const currencyRates = useSelector(state => state.rates)

  const getInfo = async () => {

    if(walletInfo) {
        setWalletInfo(null)
        return
    }

    if(!currencyRates) {
        setNoCurrencyRates(true)
        return
    }

    setLoading(true)
    
    const currencyRateDefault = currencyRates.usd
    const {balance, isOld} = await getData(address)
    const currencyConversion = currencyRateDefault * balance

    setLoading(false)
    setWalletInfo({ currencyConversion, balance })

    if(isOld) {
        setIsOldWallet(true)
    }

  }

  return (
    <div className='wallet-container'>
        <div className="wallet">
            <h5>{ address }</h5>
            <div className="show-info-btn">
                <ToggleFavorite address={address} isFavorite={isFavorite}/>
                <button onClick={ getInfo } className="btn btn-info">
                    Show info
                </button>
            </div>
        </div>

        { (walletInfo && isOldWallet) &&
        
            <div className="alert alert-danger mt-2" role="alert">
                Wallet is old!
            </div>
            
        }

        { noCurrencyRates &&

            <div className="no-currency-rates">
                <h4 className='text-center mt-3'>
                    You have to setup your currency rates
                </h4>
                <div className="go-to-settings text-center">
                    <Link to="/settings" >
                        Go to settings
                    </Link>
                </div>
                
            </div>

        }

        { loading &&

            <Loading />

        }

        { walletInfo && 
        
            <WalletInfo 
                walletInfo={walletInfo} 
                setWalletInfo={setWalletInfo} 
            />

        }
        
        
    </div>
  )
}
