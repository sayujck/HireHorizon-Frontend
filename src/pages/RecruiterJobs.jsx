import  { useState } from 'react'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button' 
import RecruiterJobTable from '../components/recruiter/JobTable'
import { useNavigate } from 'react-router-dom'


const RecruiterJobs = () => {
  const navigate = useNavigate()
  const [input,setInput] = useState("")

  return (
    <>
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input
            className="w-fit"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/recruiter/jobs/create")} className='border-1 bg-purple-700 text-white'>New Jobs</Button>
        </div>
        <RecruiterJobTable searchJobByText={input} />
      </div>
    </>
  )
}

export default RecruiterJobs