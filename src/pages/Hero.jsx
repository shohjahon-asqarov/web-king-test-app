import React from 'react'
import { heroImg } from '../assets/data'
import { Link } from 'react-router-dom'

const Hero = () => {

  return (
    <section className='container'>
      <div className="grid md:grid-cols-7 gap-x-10 gap-y-5 items-center py-10 md:py-0">
        <div data-aos='fade-up' className='space-y-3 md:space-y-5 md:col-span-4 text-center md:text-left'>
          <h1 className='text-4xl md:text-7xl font-bold'>
            <span className='text-[#289C8E]'>Web king</span> <br />
            o'quv markazi
          </h1>
          <p className='text-gray-700 md:text-lg'>
            Ta'lim va atrof muhitga inavatsion yordam berish orqali har bir inson hayotini yaxshilash
          </p>
          <Link to='/category' className='btn-blue inline-block space-x-2 py-3.5 px-8'>
            <span>Boshlamoq</span>
            <i className='bi bi-arrow-right'></i>
          </Link>
        </div>

        <div data-aos='fade-left' className='md:col-span-3'>
          <img width='500' height='500' className='lg:-translate-x-20 lg:-translate-y-5' src={heroImg} alt="hero" />
        </div>
      </div>

    </section>
  )
}

export default Hero