import React from 'react'
import { logo } from '../assets/data'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <header className='sticky top-0 bg-white z-50 border-b shadow-sm'>
            <div className="container flex justify-between py-6">
                <NavLink to="/">
                    <img className='w-44' src={logo} alt="web king logo" />
                </NavLink>
                <button className='btn-blue'>Ro'yhatdan O'tish</button>
            </div>
        </header>
    )
}

export default Navbar