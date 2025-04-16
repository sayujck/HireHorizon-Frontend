import React, { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getJobByRecruiterAPI } from '@/services/allAPI'
import { useAppContext } from '@/context/AppContext'
import JobTableSkeleton from './JobTableSkeleton'

const JobTable = ({ searchJobByText }) => {

    const { getJobUpdateStatus } = useAppContext()
    const [allJobs, setAllJobs] = useState()
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)

    const getJobsByRecruiter = async () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const reqHeader = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };
            try {
                const result = await getJobByRecruiterAPI(reqHeader)
                setAllJobs(result.data.jobs)

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        getJobsByRecruiter()
    }, [])

    useEffect(() => {
        const filteredJobs = allJobs?.filter((job) => {
            if (!searchJobByText) {
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allJobs, searchJobByText])


    return (

        <div>
            {
                loading ? (
                <div className='flex justify-center p-5'>
                   <div className='grid md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-5'>
                        {[...Array(9)].map((_, index) => (
                            <JobTableSkeleton key={index} />
                        ))}
                   </div>
                </div>
                ) : (
                    <div className='flex justify-center p-5'>
                        {filterJobs?.length > 0 ? (
                            <div className='grid md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-5'>
                                {filterJobs?.map(job => (
                                    <div key={job._id} className="p-5 shadow-md rounded-xl w-72 flex flex-col items-center bg-white border border-gray-100 hover:shadow-lg transition-shadow">
                                        <div className="w-full flex justify-between items-center h-8 mb-4">
                                            <h2 className="text-lg font-bold text-gray-800 line-clamp-2 pr-2">{job.title}</h2>
                                            <span className="text-xs text-center font-medium px-2 py-1 w-25 rounded-full bg-purple-50 text-purple-700">
                                                {getJobUpdateStatus(job?.updatedAt)}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3 w-full h-20">
                                            <img src={job.company.logo} alt={`${job.company.name} logo`} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                                            <div>
                                                <p className="text-md font-semibold text-gray-700">{job.company.name}</p>
                                            </div>
                                            <div className='w-25'>
                                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-black">
                                                    {job?.jobType}
                                                </span>
                                            </div>
                                        </div>
                                        <button onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)} className="mt-auto w-full py-2.5 px-4 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                                            <Eye className="w-4 h-4" />View Applicants
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='mt-5 text-xl text-gray-700'>No jobs found</div>
                        )}

                    </div>)
            }
        </div>


    )
}

export default JobTable