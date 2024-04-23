import React from 'react'
import Navbar from '../home/Navbar'
import Sidebar from './Sidebar'
import Main from './Main'

export default function Controls() {
  return (
    <div>
        <Navbar/>
        <main className='w-full max-w-[90rem] mx-auto py-2 px-4 sm:px-6 lg:px-8 '>
        <div className='grid grid-cols-4'>
            <div className='border-e-2'>
                <Sidebar/>
            </div>
            <div className='col-span-3 p-5'>
                <Main/>
            </div>
        </div>
      </main>
    </div>
  )
}
