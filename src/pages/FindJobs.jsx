import React from 'react'
import Header from '../components/Header'
import View from '../components/View';
import FilterJobs from '../components/FilterJobs';
import { Form } from 'react-bootstrap';

const FindJobs = () => {
  return (
    <>
    <Header/>
    <div>
        <div className='container mt-4'>
            <h3>Job Search</h3>
            <p>Search for your desired job matching your skills</p>
            <div style={{width:'1120px'}} className='d-flex justify-content-between mt-4 py-2 px-2 bg-white border 1px rounded'>
             <div>
                  <i class="fa-solid fa-magnifying-glass mx-2"></i>
                  <input style={{width:'165px'}} className='p-1 border border-0 me-2' type="text" placeholder='Enter Job title' />
                  <i class="fa-solid fa-location me-2"></i>
                  <input style={{width:'200px'}} className='p-2 border border-0 me-2' type="text" placeholder='Enter Location'/>
                  <i class="fa-solid fa-book me-2"></i>
                  <input style={{width:'250px'}} className='p-2 border border-0' type="text" placeholder='Year of Experience'/>
             </div>
              <button className='findJobBtn ms-3'>Find Job</button>
            </div>
        </div>
        <div className="row">
            {/* filter */}
            <div className="col-lg-4 p-5">
                <FilterJobs/>
            </div>

            {/* all jobs */}
            <div className="col-lg-8 pe-3 pt-3">
            <div className='d-flex justify-content-between align-items-center container p-3'></div>
                <View/>
            </div>
        </div>

    </div>
    </>
  )
}

export default FindJobs