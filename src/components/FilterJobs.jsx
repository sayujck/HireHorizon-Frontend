import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'

const FilterJobs = () => {


  return (
    <>
       <div className="flex justify-between items-center container pb-3">
        <h5 className="text-lg font-semibold">Filter</h5>
        <h6 className="text-gray-600 cursor-pointer hover:underline">Clear all</h6>
      </div>
      
     <div className='w-60'>
        <div className="container">
          <h6 className="text-md font-medium mb-5">Salary Range</h6>
          <div className="flex flex-wrap gap-6 mb-4">
            <div className="flex flex-col w-full md:w-1/3">
              <label className="text-sm font-medium mb-1">Min Salary</label>
              <input type="text" placeholder="INR" className="border rounded-lg p-1 w-full outline-none focus:ring focus:ring-purple-200" />
            </div>
            <div className="flex flex-col w-full md:w-1/3">
              <label className="text-sm font-medium mb-1">Max Salary</label>
              <input type="text" placeholder="INR" className="border rounded-lg p-1 w-full outline-none focus:ring focus:ring-purple-200" />
            </div>
          </div>
        </div>
  
        <hr className="my-4" />
  
        <div className="container">
          <h6 className="text-md font-medium">Job Type</h6>
          <div className="mt-2 space-y-2">
            <div>
              <input type="checkbox" id="all" className="mr-2" />
              <label htmlFor="all" className="text-sm">All</label>
            </div>
            <div>
              <input type="checkbox" id="full-time" className="mr-2" />
              <label htmlFor="full-time" className="text-sm">Full-Time</label>
            </div>
            <div>
              <input type="checkbox" id="part-time" className="mr-2" />
              <label htmlFor="part-time" className="text-sm">Part-Time</label>
            </div>
          </div>
        </div>
  
        <hr className="my-4" />
  
        <div className="container">
          <h6 className="text-md font-medium">Work Mode</h6>
          <div className="mt-2 space-y-2">
            <div>
              <input type="checkbox" id="on-site" className="mr-2" />
              <label htmlFor="on-site" className="text-sm">On-Site</label>
            </div>
            <div>
              <input type="checkbox" id="remote" className="mr-2" />
              <label htmlFor="remote" className="text-sm">Remote</label>
            </div>
            <div>
              <input type="checkbox" id="hybrid" className="mr-2" />
              <label htmlFor="hybrid" className="text-sm">Hybrid</label>
            </div>
          </div>
        </div>
     </div>


    </>
  )
}

export default FilterJobs