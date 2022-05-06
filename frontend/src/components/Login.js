import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../actions/userActions'
import { login, setUserInStorge } from '../services/userService'

export const Login = () => {

    const [ username, setUsername ] = useState('')
    const dispatch = useDispatch()

    const logInOrSignUp = async (event) => {

      event.preventDefault()
      const user = await login(username)

      setUserInStorge(user)

      dispatch( setUser(user) )
    
    }

  return (
    <div>
      <div className="container mt-4 pt-4">
        <h2 className='text-center'>Enter you username to get access to the app</h2>

        <form onSubmit={ (e) => logInOrSignUp(e) }
          className='mt-4 pt-4' style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="form-group">
            <label htmlFor="usernam">Username</label>
            <input value={ username } onChange={(event) => setUsername(event.target.value)}
              type="text" className="form-control" 
              placeholder='Username' id='username' />
          </div>

          <div className="submit-btn mt-4">
            <button className="btn btn-success">Log in or Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  )
}
