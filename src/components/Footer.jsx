import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer mt-5 pt-5 w-100'>
      <div className='d-flex justify-content-between px-5'>

        <div style={{width:'250px',height:'160px'}}>
          <h5>HireHorizon</h5>
          <p>456 Chandni Chowk Street, Near Red Fort, Old Delhi, New Delhi, Delhi 110006, India</p>
        </div>

        <div className='d-flex flex-column ms-2'>
          <h5>Quick Links</h5>
          <Link to={'/'} style={{textDecoration:'none',color:'black'}}>Home</Link>
          <Link to={'/'} style={{textDecoration:'none',color:'black'}}>Contact</Link>
          <Link to={'/'} style={{textDecoration:'none',color:'black'}}>About</Link>
        </div>

        <div className='d-flex flex-column ms-3'>
          <h5>Candidate</h5>
          <a style={{textDecoration:'none',color:'Black'}} target='blank'>Browse</a>
          <a style={{textDecoration:'none',color:'Black'}} target='blank'>Browse Jobs</a>
          <a style={{textDecoration:'none',color:'Black'}} target='blank'>Candidate Dashboard</a>

        </div>

        <div className='d-flex flex-column ms-3' >
          <h5>Employers</h5>
          <a style={{textDecoration:'none',color:'Black'}} target='blank'>Post a job</a>
          <a style={{textDecoration:'none',color:'Black'}} target='blank'>Browse Candidate</a>
          <a style={{textDecoration:'none',color:'Black'}} target='blank'>Employers Dashboard</a>
        </div>
      </div>
    </div>
  )
}

export default Footer