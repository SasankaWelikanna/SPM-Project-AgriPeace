import React from 'react';
import img from '../../../assets/landingPage/watering.jpg'

const Bar = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
            Discover Our <br /> Agriculture Management Tools
          </h1>

          <div className="mt-2">
            <span className="inline-block w-40 h-1 bg-green-500 rounded-full"></span>
            <span className="inline-block w-3 h-1 ml-1 bg-green-500 rounded-full"></span>
            <span className="inline-block w-1 h-1 ml-1 bg-green-500 rounded-full"></span>
          </div>

          <div className="mt-8 xl:mt-12 lg:flex lg:items-center">
            <div className="grid w-full grid-cols-1 gap-8 lg:w-1/2 xl:gap-16 md:grid-cols-2">
              <div className="space-y-3">
                <span className="inline-block p-3 text-green-500 bg-green-100 rounded-xl dark:text-white dark:bg-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V9a2 2 0 012-2h2a2 2 0 012 2v10M5 19v-4a2 2 0 012-2h10a2 2 0 012 2v4" />
                  </svg>
                </span>
                <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                  Crop Management
                </h1>
                <p className="text-gray-500 dark:text-gray-300">
                  Efficiently manage your crops, track growth stages, and get real-time updates on crop health and yield.
                </p>
              </div>

              <div className="space-y-3">
                <span className="inline-block p-3 text-green-500 bg-green-100 rounded-xl dark:text-white dark:bg-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4M3 8h18M5 12h14M7 16h10" />
                  </svg>
                </span>
                <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                  Fertilizer Management
                </h1>
                <p className="text-gray-500 dark:text-gray-300">
                  Track and optimize fertilizer usage based on soil quality and crop type for sustainable farming.
                </p>
              </div>

              <div className="space-y-3">
                <span className="inline-block p-3 text-green-500 bg-green-100 rounded-xl dark:text-white dark:bg-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m0 0l-3.5-3.5M12 16l3.5-3.5M12 8L8.5 11.5M12 8l3.5 3.5" />
                  </svg>
                </span>
                <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                  Water Resource Management
                </h1>
                <p className="text-gray-500 dark:text-gray-300">
                  Monitor and manage water resources for efficient irrigation, ensuring optimal water distribution.
                </p>
              </div>

              <div className="space-y-3">
                <span className="inline-block p-3 text-green-500 bg-green-100 rounded-xl dark:text-white dark:bg-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11V7a4 4 0 114 0v4m0 0v4a4 4 0 11-4 0v-4m0 0h4" />
                  </svg>
                </span>
                <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                  Farm Equipment Monitoring
                </h1>
                <p className="text-gray-500 dark:text-gray-300">
                  Keep track of farm equipment usage, maintenance schedules, and optimize machinery allocation.
                </p>
              </div>
            </div>

            <div className="hidden lg:flex lg:w-1/2 lg:justify-center">
              <img className="w-[28rem] h-[28rem] flex-shrink-0 object-cover xl:w-[34rem] xl:h-[34rem] rounded-full" 
                src={img} 
                alt="Agriculture Management Tools" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Bar;
