import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer mt-10 p-10 w-full bg-light'>

      <div className='container mx-auto px-5'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left'>
          {/* Company Info */}
          <div className='w-full'>
            <h5 className='text-xl font-semibold pb-2'>HireHorizon</h5>
            <p className='text'>456 Chandni Chowk Street, Near Red Fort, Old Delhi, New Delhi, Delhi 110006, India</p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className='text-lg font-semibold pb-2'>Quick Links</h5>
            <ul className='space-y-1'>
              <li><Link to='/' className='text-black hover:text-gray-600'>Home</Link></li>
              <li><Link to='/' className='text-black hover:text-gray-600'>Contact</Link></li>
              <li><Link to='/' className='text-black hover:text-gray-600'>About</Link></li>
            </ul>
          </div>

          {/* Candidate Links */}
          <div>
            <h5 className='text-lg font-semibold pb-2'>Candidate</h5>
            <ul className='space-y-1'>
              <li><Link to='/' className='text-black hover:text-gray-600'>Browse</Link></li>
              <li><Link to='/' className='text-black hover:text-gray-600'>Browse Jobs</Link></li>
              <li><Link to='/' className='text-black hover:text-gray-600'>Candidate Dashboard</Link></li>
            </ul>
          </div>

          {/* Employer Links */}
          <div>
            <h5 className='text-lg font-semibold pb-2'>Employers</h5>
            <ul className='space-y-1'>
              <li><Link to='/' className='text-black hover:text-gray-600'>Post a job</Link></li>
              <li><Link to='/' className='text-black hover:text-gray-600'>Browse Candidate</Link></li>
              <li><Link to='/' className='text-black hover:text-gray-600'>Employers Dashboard</Link></li>
            </ul>
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default Footer;