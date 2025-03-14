import React from 'react'
import ApplicantsTable from './ApplicantsTable'

const Applicants = () => {
    return (
        <div>
            <div className='max-w-7xl py-5 px-10'>
                <h1 className='font-bold text-xl my-5'>Applicants</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants
