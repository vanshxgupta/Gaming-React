import { useState } from 'react'
import Hero from './components/Hero'
import React from 'react'

function App() {

  return (

   <main className='relative min-h-screen w-screen overflow-x-hidden'>
   <Hero/>
   <section className='min-h-screen z-0 bg-white'/>
   </main>
  
  )
}

export default App
