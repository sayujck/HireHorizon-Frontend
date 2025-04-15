import React, { useEffect, useState } from 'react'
import { alljobsAPI, applyJobAPI, getJobById } from '../../services/allAPI';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';

const View = ({ searchFilters, filters }) => {

    const { query } = useAppContext()
    const [alljobs, setAlljobs] = useState([])
    const [jobDetails, setJobDetails] = useState([])

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getAllJobs()
    }, [])

    const filteredJobs = alljobs.filter((job) => {
        return (
            (searchFilters.title === '' || job.title.toLowerCase().includes(searchFilters.title.toLowerCase())) &&
            (searchFilters.location === '' || job.location.toLowerCase().includes(searchFilters.location.toLowerCase())) &&
            (searchFilters.experience === '' || job.experienceLevel == searchFilters.experience) &&
            (filters.minSalary === '' || job.salary >= Number(filters.minSalary)) &&
            (filters.maxSalary === '' || job.salary <= Number(filters.maxSalary)) &&
            (filters.jobType.length === 0 || filters.jobType.includes(job.jobType)) &&
            (filters.workMode.length === 0 || filters.workMode.includes(job.workMode)) &&
            (query.title === '' || job.title.toLowerCase().includes(query?.title.toLowerCase())) &&
            (query.location === '' || job.location.toLowerCase().includes(query?.location.toLowerCase()))
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



    return (
        <>
            {/* All jobs */}
            <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-6">
                {filteredJobs?.length > 0 ? (
                    filteredJobs?.map((job) => (
                        <div key={job?._id} className="flex flex-col p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all h-full">
                            <div className="mb-4 min-h-[5rem] flex flex-col">
                                <h3 className="text-lg font-semibold line-clamp-2 mb-2">{job?.title}</h3>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-purple-50 text-purple-700">
                                        {job?.jobType}
                                    </span>
                                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-800">
                                        {job?.salary} LPA
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 mb-4 min-h-[3.rem]">
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

                            <div className="mt-auto flex flex-col gap-2">
                                <button onClick={() => { getJobDetails(job?._id); handleOpen(); }} className="w-full py-2 px-4 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50" >View Details</button>
                                <button onClick={() => applyJob(job?._id)} className="w-full py-2 px-4 text-sm bg-purple-700 text-white rounded-md hover:bg-purple-800">Apply Now</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-10 text-gray-500">
                        No jobs matching your criteria...
                    </div>
                )}
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
                                    <h5 className="font-semibold text-xl text-purple-700">{jobDetails?.title}</h5>
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

export default View