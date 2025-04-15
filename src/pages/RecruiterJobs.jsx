import { useState } from 'react'
import { Button } from '../components/ui/button'
import RecruiterJobTable from '../components/recruiter/JobTable'
import { useNavigate } from 'react-router-dom'


const RecruiterJobs = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState("")

  return (
    <>
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between m-5'>
          <div className='flex items-center border rounded-lg px-3 py-2 w-1/2 md:w-1/4'>
          <i className="fa-solid fa-magnifying-glass text-sm text-gray-500"></i>
            <input
              className="w-full border-0 px-2 outline-none text-gray-700"
              placeholder="Search by company, role"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <Button onClick={() => navigate("/recruiter/jobs/create")} className='border-1 bg-purple-700 text-white'>New Jobs</Button>
        </div>
        <RecruiterJobTable searchJobByText={input} />
      </div>
    </>
  )
}

export default RecruiterJobs