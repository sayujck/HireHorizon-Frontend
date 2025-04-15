import React from 'react'
import ApplicantsTable from './ApplicantsTable'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


const Applicants = () => {
    const navigate = useNavigate()
    return (
        <div className='max-w-7xl py-5 px-10'>
            <Button
                onClick={() => navigate('/recruiter/jobs')}
                variant="outline"
                className="flex items-center gap-2 text-black font-semibold"
            >
                <ArrowLeft />
                <span>Back</span>
            </Button>
            <h1 className='font-semibold text-2xl my-5'>Applicants</h1>
            <ApplicantsTable />
        </div>
    )
}

export default Applicants
