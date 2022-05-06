import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetUser } from '../../actions/userActions'
import { removeUserFromStorage } from '../../services/userService'

export const Header = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const logout = () => {
      removeUserFromStorage()

      dispatch(resetUser())
  }

  return (
    <div>
        <header className='header'>
            <div className="logo">
                <h2> Wallets App </h2>
            </div>

            <div className="logout">
                <p>Hi { user.username }</p>
                <button onClick={logout} className="btn btn-primary">
                    Logout
                </button>
            </div>
        </header>
    </div>
  )
}
