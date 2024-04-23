import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'

export default function Home() {
  return (
    <div>
      <Navbar/>
      <main className='w-full max-w-[90rem] mx-auto py-2 px-4 sm:px-6 lg:px-8 '>
        <Hero/>
      </main>
    </div>
  )
}
