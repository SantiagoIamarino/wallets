import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { AddWallet } from './shared/AddWallet'
import { Wallet } from './shared/Wallet'

export const Wallets = () => {

  const wallets = useSelector(state => state.user.wallets)
  const [ isFormVisible, setIsFormVisible ] = useState(false)
  const [ onlyFavorites, setOnlyFavorites ] = useState(false)

  const toggleFavorites = (value) => {
    const onlyFavoritesValue = (value === 'all') ? false : true

    setOnlyFavorites(onlyFavoritesValue)
  }

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h2>List of wallets</h2>
        <div className="add-wallet">
          <button onClick={ () => setIsFormVisible(!isFormVisible) } 
            className="btn btn-primary">
            Add wallet
          </button>
        </div>
      </div>

      { isFormVisible &&

        <AddWallet />

      }

      <div className="toggle-favorites">
        <div className="form-group">
          <label htmlFor="favoritesToggler">Filter</label>
          <select onChange={(e) => toggleFavorites(e.target.value)}
            id="favoritesToggler" className="form-control">
            <option value="all">All</option>
            <option value="only-favorites">Only favorites</option>
          </select>
        </div>
      </div>

      <div className="wallet-list">
        { (wallets.length > 0) ?
            
            wallets.map((wallet, index) => (
              (!onlyFavorites || wallet.isFavorite) &&
                <Wallet 
                  key={index} 
                  address={wallet.address}
                  isFavorite={wallet.isFavorite} 
                />
            ))
          
          :

            <h4 className='text-center mt-4 pt-4'>No wallets no show</h4>

        }
      </div>

    </div>
  )
}
