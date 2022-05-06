import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../actions/userActions'
import { setUserInStorge } from '../../services/userService'
import { addWallet } from '../../services/walletsService'

export const AddWallet = () => {

  const user = useSelector(state => state.user)
  const [address, setAddress] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const dispatch = useDispatch()

  const saveWallet = async (e) => {
    e.preventDefault()

    const walletExist = user.wallets.find(wallet => wallet.address == address)

    if(walletExist) {
        setErrorMessage('Wallet already added')
        return
    }
    
    const newWallet = {
        address,
        isFavorite: false
    }
    const userData = {
        ...user,
        wallets: [ ...user.wallets, newWallet ]
    }

    await addWallet(address, userData)
    setUserInStorge(userData)
    dispatch(setUser(userData))
    setAddress('')

  }

  return (
    <div>
        
        { errorMessage &&
              <div className="alert alert-danger mt-3" role="alert">
                { errorMessage }
              </div>    
        }

        <form onSubmit={ (e) => saveWallet(e) } className='mt-2'>
            <div className="row">
                <div className="col-9">
                    <div className="form-grup">
                        <label htmlFor="wallet_address">Address</label>
                        <input value={address} onChange={ (e) => setAddress(e.target.value) }
                            id="wallet_address" type="text" 
                            className="form-control" />
                    </div>
                </div>
                <div className="col-3">
                    <button className='btn btn-success mt-4'>
                        Save
                    </button>
                </div>
            </div>
           
        </form>
    </div>
  )
}
