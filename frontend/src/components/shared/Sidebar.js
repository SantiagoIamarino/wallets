import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Sidebar = () => {

    const location = useLocation()


    return (
        <div className='sidebar'>
            <ul>
                <li className={ (location.pathname === '/') ? 'active' : '' }>
                    <Link to="/">Wallets</Link>
                </li>
                <li className={ (location.pathname === '/settings') ? 'active' : '' }>
                    <Link to="/settings">Settings</Link>
                </li>
            </ul>
        </div>
    )
}
