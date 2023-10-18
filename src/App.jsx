import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import Hero from './pages/Hero'
import Categories from './pages/Categories'
import Test from './pages/Test'

import 'bootstrap-icons/font/bootstrap-icons.css'

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  )
}

export default App