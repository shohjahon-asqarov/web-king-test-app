import React from 'react'
import { logo } from '../assets/data'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <header className='sticky top-0 bg-white z-50 border-b shadow-sm'>
            <div className="container flex justify-between py-6 items-center">
                <NavLink to="/">
                    <img className='w-32 sm:w-44' src={logo} alt="web king logo" />
                </NavLink>
                <button className='btn-blue bg-[#2C74B3]'>
                    <i className='bi bi-person mr-2'></i>
                    Kirish
                </button>
            </div>
        </header>
    )
}

export default Navbar