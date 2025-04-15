import { assets } from '@/assets/assets'
import React from 'react'


const CompanyLogos = () => {



    return (
        <>
            <p className='text-center text-2xl font-semibold my-5 p-4'>Top companies hiring now</p>
            <div className='flex flex-wrap justify-center items-center mb-5 gap-10 gap-md-5'>
                <img className='img-fluid' style={{ width: '70px', height: 'auto' }} src={assets.google} alt="Google" />
                <img className='img-fluid' style={{ width: '110px', height: 'auto' }} src={assets.flipkart} alt="Flipkart" />
                <img className='img-fluid' style={{ width: '70px', height: 'auto' }} src={assets.ibm} alt="IBM" />
                <img className='img-fluid' style={{ width: '70px', height: 'auto' }} src={assets.microsoft} alt="Microsoft" />
                <img className='img-fluid' style={{ width: '70px', height: 'auto' }} src={assets.youtube} alt="YouTube" />
            </div>
        </>
    )
}

export default CompanyLogos