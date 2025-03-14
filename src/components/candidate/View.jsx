import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.svg'
import { alljobsAPI, applyJobAPI, getJobById } from '../../services/allAPI';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from 'sonner';


const View = ({ searchFilters, filters }) => {

    const [alljobs, setAlljobs] = useState([])
    const [jobDetails, setJobDetails] = useState([])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getAllJobs()
    }, [])

    const filteredJobs = alljobs.filter((job) => {
        return (
            (searchFilters.title === '' || job.title.toLowerCase().includes(searchFilters.title.toLowerCase())) &&
            (searchFilters.location === '' || job.location.toLowerCase().includes(searchFilters.location.toLowerCase())) &&
            (searchFilters.experience === '' || job.experienceLevel == (searchFilters.experience)) &&
            (filters.minSalary === '' || job.salary >= parseInt(filters.minSalary)) &&
            (filters.maxSalary === '' || job.salary <= parseInt(filters.maxSalary)) &&
            (filters.jobType.length === 0 || filters.jobType.includes(job.jobType)) &&
            (filters.workMode.length === 0 || filters.workMode.includes(job.location))
        );
    });


    // get all jobs
    const getAllJobs = async () => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await alljobsAPI(reqHeader);
                if (result.status == 200) {
                    setAlljobs(result.data.jobs)
                }

            } catch (error) {
                console.log(error);

            }
        }
    }

    // get job details by id
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
                }
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
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
            toast.error("Please Login")
        }
    }

    console.log(alljobs);
    


    return (
        <>
            {/* All jobs */}
            <div className="container">
                <h5 className='py-1 text-2xl font-semibold'>All Jobs</h5>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-6">
                    {
                        filteredJobs?.length > 0 ? (
                            filteredJobs?.map((jobs) => (
                                <div key={jobs?._id} className="p-4 bg-white shadow-lg rounded-lg">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-semibold">{jobs?.title}</h3>
                                        <p className="text-gray-500 mb-2">{jobs?.jobType}</p>
                                        <p className="text-gray-600">Salary: {jobs?.salary} LPA</p>
                                    </div>
                                    <div className="flex items-center gap-1 mb-4">
                                        <img className="w-12 h-12 object-cover" src={logo} alt="Company Logo" />
                                        <div>
                                            <h6 className="text-sm font-medium">{jobs?.company?.name}</h6>
                                            <p className="text-xs text-gray-500">{jobs?.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <button onClick={() => { getJobDetails(jobs?._id), handleOpen() }} className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition">View Details</button>
                                        <button onClick={() => applyJob(jobs?._id)} className="w-full py-2 px-4 bg-purple-800 text-white rounded-md hover:bg-purple-700 transition">Apply Now</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500">No jobs have been posted yet...</div>
                        )
                    }
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
                                onClick={handleClose}>
                                Close
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </>
        </>
    )
}

export default View