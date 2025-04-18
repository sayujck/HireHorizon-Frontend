import React, { useEffect, useState } from 'react'
import { getAppliedJobAPI } from '@/services/allAPI';
import { useNavigate } from 'react-router-dom';
import SkeletonAppliedJobs from './SkeletonAppliedJobs';
import { ArrowLeft } from 'lucide-react';


const AppliedJobs = () => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [appliedJobs, setAppliedJobs] = useState([])

  useEffect(() => {
    setLoading(true)
    getAppliedJobs()
  }, [])

  const getAppliedJobs = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await getAppliedJobAPI(reqHeader)
        setAppliedJobs(result.data.application)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }

    }
  }

  return (
    <>
      <h4 className='px-4 text-2xl font-semibold mb-10'>Applied Jobs</h4>
      {
        loading ? (
          <div className="space-y-4 mb-10 transition-all duration-300">
            {
              [...Array(3)].map((_, index) => (
                <SkeletonAppliedJobs key={index} />
              ))
            }
          </div>

        ) :
          (<div className="space-y-4 mb-10">
            {appliedJobs?.length > 0 ? (
              appliedJobs?.map((job) => (
                <div key={job._id} className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white" >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <img className="rounded-full w-10 h-10 flex items-center justify-center" src={job.job.company.logo} alt="" />
                        <div>
                          <h3 className="font-semibold text-gray-800">{job?.job?.title}</h3>
                          <p className="text-sm text-gray-600">{job?.job?.company.name}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="text-sm text-gray-500">
                        Applied: {new Date(job?.createdAt).toLocaleDateString()}
                      </div>
                      <span className={`px-3 py-1 w-fit rounded-full text-xs font-medium ${job?.status === "rejected" ? "bg-red-100 text-red-800" : job?.status === "pending" ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"}`}>
                        {job?.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))

            ) : (
              <div className="flex flex-col items-center justify-center text-center py-10">
              <p className="text-xl text-gray-400 mb-5">No applications found</p>
              <button onClick={() => navigate('/jobs')} className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Browse Jobs</span>
              </button>
            </div>     
            )}
          </div>
          )}
    </>
  )
}

export default AppliedJobs