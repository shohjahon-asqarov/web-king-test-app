import React from 'react'
import { heroImg } from '../assets/data'

const Hero = () => {
  return (
    <section className='container'>
      <div className="flex justify-between items-center">
        <div className='space-y-5'>
          <h1 className='text-6xl font-bold text-gray-900'>
            Web king <br />
            Modern teaching spot
          </h1>
          <p className='text-gray-700 text-lg'>
            Modern teaching spot
          </p>
          <button className='btn-blue'>Boshlamoq</button>
        </div>
        <div>
          <img src={heroImg} alt="hero" />
        </div>
      </div>
    </section>
  )
}

export default Hero