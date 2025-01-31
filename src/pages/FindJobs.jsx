import React, { useState } from 'react'
import Header from '../components/Header'
import View from '../components/View';
import FilterJobs from '../components/FilterJobs';
import { Button } from '@/components/ui/button';

const FindJobs = () => {

  const [searchFilters, setSearchFilter] = useState({
    title: '', location: '', experience: ''
  })

  const [jobResults, setJobResults] = useState([]);

  const findJobs = () => {
    alert("working")
    const mockJobs = [
      { title: 'Frontend Developer', location: 'New York', experience: '2' },
      { title: 'Backend Engineer', location: 'San Francisco', experience: '4' },
      { title: 'Fullstack Developer', location: 'Remote', experience: '3' }
    ];

    const filteredJobs = mockJobs.filter((job) => {
      return (
        (searchFilters.title === '' || job.title.toLowerCase().includes(searchFilters.title.toLowerCase())) &&
        (searchFilters.location === '' || job.location.toLowerCase().includes(searchFilters.location.toLowerCase())) &&
        (searchFilters.experience === '' || job.experience === searchFilters.experience)
      );
    });

    setJobResults(filteredJobs);
  };

  jobResults?.length > 0 &&
    console.log(jobResults);


  return (
      <>
      <Header />
      <div>
        <div className='container mt-6 ms-10'>
          <h3 className='text-2xl font-semibold'>Job Search</h3>
          <p>Search for your desired job matching your skills</p>
          <div className='w-300 mt-2 flex justify-between px-2 py-1.5 bg-white border 1px rounded '>
            <div>
              <i class="fa-solid fa-magnifying-glass mx-2"></i>
              <input onChange={(e) => setSearchFilter({ ...searchFilters, title: e.target.value })} style={{ width: '165px' }} className='p-1 border-0 me-2' type="text" placeholder='Enter Job title' />
              <i class="fa-solid fa-location me-2"></i>
              <input onChange={(e) => setSearchFilter({ ...searchFilters, location: e.target.value })} style={{ width: '200px' }} className='p-2 border-0 me-2' type="text" placeholder='Enter Location' />
              <i class="fa-solid fa-book me-2"></i>
              <input onChange={(e) => setSearchFilter({ ...searchFilters, experience: e.target.value })} style={{ width: '250px' }} className='p-2 border-0' type="text" placeholder='Year of Experience' />
            </div>
            <Button onClick={findJobs} variant='outline' className='bg-purple-700 text-white ms-3'>Find Job</Button>
          </div>
        </div>

        <div className="grid">
          {/* filter */}
          <div className="row-start-3 px-10 pt-6">
            <FilterJobs />
          </div>

          {/* all jobs */}
          <div className="row-start-3">
            <div className='d-flex justify-content-between align-items-center container p-3'>
              <div className='row-start-3 p-3'>
                <View />
              </div>
            </div>
          </div>
        </div>
        </div>
      </>
      )
  }

      export default FindJobs