import React from 'react'
import { heroImg } from '../assets/data'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className='container'>
      <div className="grid grid-cols-7 gap-10 items-center">
        <div className='space-y-5 col-span-4'>
          <h1 className='text-6xl font-bold text-gray-900'>
            <span className='text-yellow'>Web king</span> <br />
            o'quv markazi
          </h1>
          <p className='text-gray-700 text-lg'>
            Ta'lim va atrof muhitga inavatsion yordam berish orqali
          </p>
          <Link to='/category' className='btn-blue inline-block space-x-2 py-3.5 px-8'>
            <span>Boshlamoq</span>
            <i className='bi bi-arrow-right'></i>
          </Link>
        </div>

        <div className='col-span-3'>
          <img src={heroImg} alt="hero" />
        </div>
      </div>
    </section>
  )
}

export default Hero