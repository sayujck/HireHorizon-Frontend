import React, { useEffect, useState } from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Header = () => {
  
  return (
    
    <Navbar className="p-2 d-flex justify-content-between">
      <Link to={'/'} className='text-decoration-none text-black fw-bold fs-4 ms-4'>HireHorizon</Link>
      <div className='fw-semibold'>
        <Link to={'/'} className='text-decoration-none me-5 text-black'>Home</Link>
        <Link to={'/jobs'} className='text-decoration-none me-5 text-black'>Find Job</Link>
        <Link to={'/employers'} className='text-decoration-none me-5 text-black'>Employers</Link>
        <Link className='text-decoration-none me-5 text-black'>About Us</Link>
        <Link className='text-decoration-none text-black'>Contact Us</Link>
      </div>
      <div className='p-3'>
          <Link to={'/login'}><button className='btn border me-3 px-4'>Login</button></Link>
          <Link to={'/register'}><button className='signupBtn'>Signup</button></Link>
      </div>
    </Navbar>
  )
}

export default Header