import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'

function Body() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
    
  )
}

export default Body