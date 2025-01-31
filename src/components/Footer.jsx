import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer mt-10 p-10 w-full bg-light'>
      <div className='container flex justify-center'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
          {/* Company Info */}
          <div className='w-60 '>
            <h5 className='text-xl font-semibold pb-2'>HireHorizon</h5>
            <p>456 Chandni Chowk Street, Near Red Fort, Old Delhi, New Delhi, Delhi 110006, India</p>
          </div>

          {/* Quick Links */}
          <div className='grid grid-cols-1'>
            <h5 className='text-lg font-semibold pb-2'>Quick Links</h5>
            <Link to={'/'} className='d-block text-decoration-none text-black'>Home</Link>
            <Link to={'/'} className='d-block text-decoration-none text-black'>Contact</Link>
            <Link to={'/'} className='d-block text-decoration-none text-black'>About</Link>
          </div>

          {/* Candidate Links */}
          <div className='grid grid-cols-1'>
            <h5 className='text-lg font-semibold pb-2'>Candidate</h5>
            <a href='/' className='d-block text-decoration-none text-black' target='_blank'>Browse</a>
            <a href='/' className='d-block text-decoration-none text-black' target='_blank'>Browse Jobs</a>
            <a href='/' className='d-block text-decoration-none text-black' target='_blank'>Candidate Dashboard</a>
          </div>

          {/* Employer Links */}
          <div className='grid grid-cols-1'>
            <h5 className='text-lg font-semibold pb-2'>Employers</h5>
            <a href='/' className='d-block text-decoration-none text-black' target='_blank'>Post a job</a>
            <a href='/' className='d-block text-decoration-none text-black' target='_blank'>Browse Candidate</a>
            <a href='/' className='d-block text-decoration-none text-black' target='_blank'>Employers Dashboard</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
