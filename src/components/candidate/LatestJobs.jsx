import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { applyJobAPI, getJobById, latestjobsAPI } from '../../services/allAPI'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import toast from 'react-hot-toast'
import SkeletonJobCard from './SkeletonJobCard'

const LatestJobs = () => {

    const { user } = useSelector(store => store.auth)
    const [latestjobs, setLatestjobs] = useState([])
    const [jobDetails, setJobDetails] = useState([])
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        getLatestJobs()
    }, [])

    // get latets jobs
    const getLatestJobs = async () => {
        try {
            const result = await latestjobsAPI()
            setLatestjobs(result.data.jobs)
        }
        catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    //get job by id
    const getJobDetails = async (jobId) => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const result = await getJobById(jobId, reqHeader);
                if (result.status === 200) {
                    setJobDetails(result.data);
                    handleOpen();
                }
            } catch (error) {
                console.error("Error fetching job details:", error);
            } 
        }
        else {
            toast.error("Please Login")
        }
    };

    // apply job
    const applyJob = async (jobId) => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const result = await applyJobAPI(jobId, reqHeader);
                if (result.status === 201) {
                    toast.success(result.data.message)
                }
                else if (result.status === 401) {
                    toast.error(result.response.data.message)
                }
            } catch (error) {
                console.error("Error ", error);
            }
        }
        else {
            toast.error("Please login")
        }
    }

    const viewDetails = (id) => {
        if (user) {
            getJobDetails(id); 
            handleOpen();
        }
        else {
            toast.error("Please login")
        }
    }

    // view all jobs
    const viewAllJobs = () => {
        if (user) {
            navigate('/jobs')
        }
        else {
            toast.error("Please login to view all jobs")
        }
    }


    return (
        <>
            <div className="featured mt-10">
                {/* Section Title */}
                <div className="text-center">
                    <h2 className="text-3xl font-semibold">Latest Jobs</h2>
                    <p className="text-gray-700 mt-2">Choose the latest jobs from employers and apply for the same.</p>
                </div>

                {
                    loading ? (<div className="flex flex-wrap justify-center mt-10 gap-6 transition-all duration-300">
                        {[...Array(3)].map((_, i) => (
                            <SkeletonJobCard key={i} />
                        ))}
                    </div>) : (<div className="flex flex-wrap justify-center mt-10 gap-6">
                        {latestjobs?.length > 0 &&
                            latestjobs.map((job) => (
                                <div key={job?._id} className="flex flex-col p-5 w-65 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all h-full">
                                    <div className="mb-2 min-h-[3rem] flex flex-col">
                                        <h3 className="text-lg font-semibold leading-tight line-clamp-2 mb-2">{job?.title}</h3>
                                        <div className="flex flex-wrap gap-1 mt-auto">
                                            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-purple-50 text-purple-700">
                                                {job?.jobType}
                                            </span>
                                            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-800">
                                                {job?.salary} LPA
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 mb-2 min-h-[3.5rem]">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                                src={job?.company?.logo}
                                                alt="logo"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <h6 className="text-sm font-medium truncate">{job?.company?.name}</h6>
                                            <p className="text-xs text-gray-500 truncate">{job?.location}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button onClick={() => viewDetails(job?._id)} className="w-full py-2 px-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50" >View Details</button>
                                        <button onClick={() => applyJob(job?._id)} className="w-full py-2 px-2 text-sm bg-purple-700 text-white rounded-md hover:bg-purple-800">Apply Now</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>)
                }

                {/* View All Button */}
                <div className="text-center my-6">
                    <button className="border-0 bg-transparent text-purple-600 underline cursor-pointer" onClick={viewAllJobs}>View all</button>
                </div>
            </div>

            {/* Job details Modal */}
            <>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="w-4/5 md:w-3/5 max-w-3xl mx-auto bg-white shadow-2xl p-8 rounded-xl border border-gray-100 mt-10">
                        <Typography
                            id="modal-modal-description"
                            className="mb-6  text-base text-gray-700"
                        >
                            {jobDetails ? (
                                <div className="space-y-4 mt-4">
                                    <h5 className="font-semibold text-xl text-purple-800">{jobDetails?.title}</h5>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">Description:</span> {jobDetails?.description}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">Job Type:</span> {jobDetails?.jobType}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-bold text-md">Experience Level:</span> {jobDetails?.experienceLevel} years
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">Location:</span> {jobDetails?.location}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">Requirements:</span> {jobDetails?.requirements?.join(', ')}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">Salary:</span> {jobDetails?.salary} LPA
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">Vacancy:</span> {jobDetails?.vacancy}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">Applicants:</span> {jobDetails?.applications?.length}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">Posted On:</span> {new Date(jobDetails?.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-center text-gray-600">Loading...</p>
                            )}
                        </Typography>

                        {/* Close Button */}
                        <Box className="text-right">
                            <button
                                className='bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800'
                                onClick={handleClose}>
                                Close
                            </button>
                        </Box>
                    </Box>
                </Modal>
            </>

        </>
    )
}

export default LatestJobs