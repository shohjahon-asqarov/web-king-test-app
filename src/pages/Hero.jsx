import React from 'react'
import { heroImg } from '../assets/data'
import { Link } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation'

const Hero = () => {

  return (
    <section className='container'>
      <div className="grid lg:grid-cols-7 gap-x-10 gap-y-5 items-center py-10 lg:py-10">
        <div data-aos='fade-up' className='space-y-3 md:space-y-5 lg:col-span-4 text-center lg:text-left'>
          <h1 className='text-4xl md:text-7xl font-bold'>
            Webking <br />
            <span className='text-[#289C8E]'>
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  `o'quv markazi`,
                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                  'Academy',
                  1000,
                ]}
                wrapper="span"
                speed={20}
                repeat={Infinity}
              />
            </span>
          </h1>
          <p className='text-gray-700 md:text-lg px-5 sm:px-0'>
            Pastdagi tugmani bosing va bilimingizni sinab ko'ring
          </p>
          <Link to='/category' className='btn-blue inline-block space-x-2 py-3.5 px-8'>
            <span>Boshlash</span>
            <i className='bi bi-arrow-right'></i>
          </Link>
        </div>

        <div data-aos='fade-left' className='lg:col-span-3 hero-img mx-auto sm:w-9/12 lg:w-full'>
          <img width='700' height='700' className='lg:-translate-x-20 lg:-translate-y-5 w-11/12 mx-auto sm:w-full' src={heroImg} alt="hero" />
        </div>
      </div>

    </section>
  )
}

export default Hero