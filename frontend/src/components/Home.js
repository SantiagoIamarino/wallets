import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRates } from '../actions/ratesActions'
import { setUser } from '../actions/userActions'
import { getRatesFromStorage } from '../services/ratesService'
import { getUserFromStorage } from '../services/userService'
import { Dashboard } from './Dashboard'
import { Login } from './Login'

export const Home = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {

    const loggedUser = getUserFromStorage()

    if(loggedUser) {
      dispatch(setUser(loggedUser))
    }

    const rates = getRatesFromStorage()
    if(rates) {
      dispatch(setRates(rates))
    }

  }, [dispatch])

  return (
    <div>

        { user ? 
            <Dashboard />
          :
            <Login />
        }

    </div>
  )
}
