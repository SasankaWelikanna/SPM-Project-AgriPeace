import React from 'react'
import img from '../../../assets/landingPage/illustration.png'

const Bar1 = () => {
  return (
    <div className='bg-slate-200 dark:bg-slate-700 flex flex-col lg:flex-row justify-center items-center lg:items-start p-6'>
      <div className='flex justify-center lg:w-1/2'>
         <img src={img} alt="image" className='w-2/3 max-w-xs lg:max-w-none' />
      </div>
      <div className='lg:w-1/2 my-auto p-0 lg:pl-6'>
      <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-yellow-500 text-center lg:text-left'>
          Welcome to AgriPeace: Farm with Ease
        </h1>
        <p className='mt-4 text-lg text-gray-600 text-center lg:text-left dark:text-white py-5'>
          Our agriculture management system provides innovative solutions for modern farming. 
          From tracking fertilizer distribution to recognizing plant diseases, we aim to make farming more efficient and sustainable.
        </p>
        <p className='mt-2 text-lg text-gray-600 text-center lg:text-left dark:text-white'>
          Start your journey today with tools designed to optimize resources, improve crop health, and increase productivity.
        </p>
      </div>
    </div>
  )
}

export default Bar1;
