import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import './App.css'
import AppRoutes from './routes/routes'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <>
      <Navbar/>
      <AppRoutes/>
      <Footer/>
      
    </>
  )
}

export default App
