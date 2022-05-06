import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setRates } from '../actions/ratesActions'
import { getRatesFromStorage, setRatesOnStorage, validateRates } from '../services/ratesService'

export const Settings = () => {

  const [ usdRate, setUsdRate ] =  useState('')
  const [ eurRate, setEurRate ] =  useState('')
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ successMessage, setSuccessMessage ] = useState('')

  useEffect(() => {

    const rates = getRatesFromStorage()
    if(rates) {

      setUsdRate((rates?.usd) ? rates.usd : '')
      setEurRate((rates?.eur) ? rates.eur : '')

    }

  }, [])

  const dispatch = useDispatch()

  const saveRates = (event) => {

    event.preventDefault()

    const rates = { usd: usdRate, eur: eurRate }

    const validation = validateRates(rates)
    if(!validation.ok) {
      setErrorMessage(validation.message)
      return
    }

    setRatesOnStorage(rates)
    dispatch(setRates(rates))
    setErrorMessage('')
    setSuccessMessage('Rates updated correcty')

  }

  return (
    <div>
      <div className="container">
        <h2 className='text-center'>Set exchange rates</h2>

        <form onSubmit={ (e) => saveRates(e) } className='mt-4 pt-4'>

          <div className="form-grup mt-3">
            <label htmlFor="usd">ETH/USD</label>
            <input value={usdRate} onChange={ (event) => setUsdRate(event.target.value) }
              id="usd"type="text" 
              className="form-control" placeholder='Example: 4000' />
          </div>

          <div className="form-grup mt-3">
            <label htmlFor="eur">ETH/EUR</label>
            <input value={eurRate} onChange={ (event) => setEurRate(event.target.value) }
              id="eur"type="text" 
              className="form-control" placeholder='Example: 4000' />
          </div>

          { errorMessage &&
              <div className="alert alert-danger mt-3" role="alert">
                { errorMessage }
              </div>    
          }

          { successMessage &&
              <div className="alert alert-success mt-3" role="alert">
                { successMessage }
              </div>    
          }

          <div className="submit-btn mt-4">
            <button className="btn btn-primary">
              Save rates
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}
