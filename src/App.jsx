import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import Hero from './pages/Hero'
import Categories from './pages/Categories'
import Test from './pages/Test'

import 'bootstrap-icons/font/bootstrap-icons.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ReactGA from "react-ga4";

import AOS from 'aos';
// import 'aos/dist/aos.css';

import './css/loader.css'
import useGaTracker from './useGaTracker'


const App = () => {
  useEffect(() => {
    AOS.init()
  }, [])

  useGaTracker()

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/category" element={<Categories />} />
        <Route path="/test" element={<Test />} />
      </Routes>

      <ToastContainer />
    </div>
  )
}


export default App