import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Settings } from './Settings'
import { Header } from './shared/Header'
import { Sidebar } from './shared/Sidebar'
import { Wallets } from './Wallets'

export const Dashboard = () => {
  return (
    <Router>
        
        <Header />

        <Sidebar />
        
        <div className='content'>
            <Routes>

                <Route path='/' element ={
                    <Wallets />
                } />

                <Route path='/settings' element ={
                    <Settings />
                } />

            </Routes>
        </div>
        

    </Router>
  )
}
