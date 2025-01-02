import React, { useState } from 'react'
import Header from '../components/Header'
import PostJob from '../components/PostJob';

const Employers = () => {


  return (
    <>
      <Header />
      <div className='container mt-4'>
        <h3>Post a Job</h3>
        <p>Find the best talent for your company</p>
      </div>
      <div>
        <PostJob />
      </div>
    </>
  )
}

export default Employers