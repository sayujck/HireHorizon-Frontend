import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { applyJobAPI, getJobById, latestjobsAPI } from '../../services/allAPI'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import logo from '../../assets/logo.svg'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const LatestJobs = () => {

    const { user } = useSelector(store => store.auth)
    const [latestjobs, setLatestjobs] = useState([])
    const [jobDetails, setJobDetails] = useState([])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const navigate = useNavigate()

    useEffect(() => {
        getLatestJobs()
    }, [])

    // get latets jobs
    const getLatestJobs = async () => {
        try {
            const result = await latestjobsAPI()
            // console.log(result.data.jobs);
            setLatestjobs(result.data.jobs)
        }
        catch (err) {
            console.log(err);
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
                console.log(result.status);
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
            toast.error("Please Login")
        }
    }

    // view all jobs
    const viewAllJobs = () => {
        if (user) {
            navigate('/jobs')
        }
        else {
            toast.error("Please Login to view all jobs")
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

                <div className="flex flex-wrap justify-center mt-10 gap-6">
                    {latestjobs?.length > 0 &&
                        latestjobs.map((jobs) => (
                            <div key={jobs?._id} className="w-full sm:w-1/2 lg:w-1/4 flex justify-center">
                                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
                                    <h3 className="text-xl font-semibold mb-4">{jobs?.title}</h3>
                                    <p className="text-gray-500 mb-2">{jobs?.jobType}</p>
                                    <p className="text-gray-500 mb-4">Salary: {jobs?.salary} LPA</p>

                                    <div className="flex items-center mb-4">
                                        <img className="w-12 h-12 object-cover" src={logo} alt="Company Logo" />
                                        <div className="ml-4">
                                            <h6 className="font-semibold">{jobs?.company?.name}</h6>
                                            <p className="text-gray-600 text-sm">{jobs?.location}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 mt-4">
                                        <button onClick={() => getJobDetails(jobs?._id)} className="border px-4 py-2 rounded text-purple-600 hover:bg-purple-100"> View Details
                                        </button>
                                        <button onClick={() => applyJob(jobs?._id)} className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800">Apply now</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {/* View All Button */}
                <div className="text-center my-6">
                    <button
                        className="border-0 bg-transparent text-purple-600 underline cursor-pointer"
                        onClick={viewAllJobs}
                    >
                        View all
                    </button>
                </div>
            </div>
            <>
                {/* Job details Modal */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="w-4/5 md:w-3/5 max-w-3xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 shadow-2xl p-8 rounded-xl border border-gray-100">
                        <Typography
                            id="modal-modal-description"
                            className="mb-6  text-base text-gray-700"
                        >
                            {jobDetails ? (
                                <div className="space-y-4 mt-4">
                                    <h5 className="font-semibold text-xl text-blue-800">{jobDetails?.title}</h5>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">Description:</span> {jobDetails?.description}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">Job Type:</span> {jobDetails?.jobType}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">Experience Level:</span> {jobDetails?.experienceLevel} years
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
                            <Button
                                variant="contained"
                                onClick={handleClose}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 px-6 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                            >
                                Close
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </>

        </>
    )
}

export default LatestJobs