import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, toggleWalletFavorite } from '../../actions/userActions'
import { setUserInStorge, updateUser } from '../../services/userService'

export const ToggleFavorite = ({ address, isFavorite }) => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const onClick = async () => {

    const wallets = 
      user.wallets.map(wallet => {
          if(wallet.address === address) {
              return {
                  ...wallet,
                  isFavorite: !wallet.isFavorite
              }
          }

          return wallet
      })

    const userData = {
      ...user,
      wallets
    }

    await updateUser(userData)
    dispatch(setUser(userData))
    setUserInStorge(userData)
    
  }

  return (
    <div style={{ marginRight: '10px', display: 'inline-block' }} >
        <button onClick={onClick}
            className={`btn btn${(!isFavorite) ? '-outline' : ''}-warning`}>
            Fav
        </button>
    </div>
  )
}
