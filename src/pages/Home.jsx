import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import hero from '../assets/hero.png'
import { Card, Modal } from 'react-bootstrap'
import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import google from '../assets/company/google.png'
import flipkart from '../assets/company/flipkart.png'
import ibm from '../assets/company/ibm.png'
import microsoft from '../assets/company/microsoft.png'
import youtube from '../assets/company/youtube.png'
import Footer from '../components/Footer'
import { applyJobAPI, getJobById, latestjobsAPI } from '../services/allAPI'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useSelector } from 'react-redux'


const Home = () => {

    const { user } = useSelector(store => store.auth)
    const [latestjobs, setLatestjobs] = useState([])
    const [jobDetails, setJobDetails] = useState([])
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => {
        setShow(true);
    }


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
                    handleShow();
                }
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        }
        else {
            alert("Please Login")
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
                    alert("Applied Successfully");
                }
                else if (result.status === 401) {
                    alert("Already Applied")
                }
            } catch (error) {
                console.error("Error ", error);
            }
        }
        else {
            alert("Please Login")
        }
    }

    // view all projects
    const viewAllJobs = () => {
        if (user) {
            navigate('/jobs')
        }
        else {
            alert("Please Login to view all jobs")
        }
    }

    return (
        <>
            <Header />
            {/* Hero Section */}
            <div className="heroSection pt-8 flex flex-col md:flex-row justify-between items-center gap-10">
                {/* Hero Content */}
                <div className="w-full ms-20 md:w-1/2 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-semibold">
                        Find a job that aligns with your interests and skills
                    </h1>
                    <p className="mt-4 pb-4 text-gray-600">
                        Thousands of jobs in all the leading sectors are waiting for you.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-4">
                        <div className="flex items-center border rounded-lg p-2 w-full max-w-50">
                            <i className="fa-solid fa-magnifying-glass text-gray-500 mr-2"></i>
                            <input
                                type="text"
                                placeholder="Job title, Keyword..."
                                className="outline-none w-full bg-transparent"
                            />
                        </div>

                        <div className="flex items-center border rounded-lg p-2 w-full max-w-40">
                            <i className="fa-solid fa-location-dot text-gray-500 mr-2"></i>
                            <input
                                type="text"
                                placeholder="Location"
                                className="outline-none w-full bg-transparent"
                            />
                        </div>

                        <button className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition mt-2 md:mt-0">
                            <i className="fa-solid fa-search mr-2"></i>Find Job
                        </button>
                    </div>
                </div>
                {/* Hero Image */}
                <div className="w-full md:w-1/2 mt-6 md:mt-0">
                    <img
                        src={hero}
                        alt="Hero"
                        className="w-full max-w-md object-cover mx-auto"
                    />
                </div>
            </div>

            {/* Latest */}
            <div className="featured mt-10">
                {/* Section Title */}
                <div className="text-center">
                    <h2 className="text-3xl font-semibold">Latest Jobs</h2>
                    <p className="text-gray-700 mt-2">Choose the latest jobs from employers and apply for the same.</p>
                </div>

                <div className="flex flex-wrap justify-center mt-10 gap-6">
                    {latestjobs.length > 0 &&
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


            {/* Job details Modal */}
            <Modal Modal size='lg' centered
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Job Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {
                            jobDetails &&
                            <div key={jobDetails._id}>
                                <h5 className='mb-4'>{jobDetails?.title}</h5>
                                <p>Description: {jobDetails?.description}</p>
                                <p>Job Type: {jobDetails?.jobType}</p>
                                <p>Experience Level: {jobDetails?.experienceLevel} years</p>
                                <p>Location: {jobDetails?.location}</p>
                                <p>Requirements: {jobDetails?.requirements?.join(', ')}</p>
                                <p>Salary: {jobDetails?.salary} LPA</p>
                                <p>Vacancy: {jobDetails?.vaccancy}</p>
                                <p>Posted On: {new Date(jobDetails?.createdAt).toLocaleDateString()}</p>
                            </div>

                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>

            <p className='text-center text-2xl font-semibold mt-5 py-4'>Top companies hiring now</p>
            <div className='flex flex-wrap justify-center items-center mb-5 gap-10 gap-md-5'>
                <img className='img-fluid' style={{ width: '70px', height: 'auto' }} src={google} alt="Google" />
                <img className='img-fluid' style={{ width: '110px', height: 'auto' }} src={flipkart} alt="Flipkart" />
                <img className='img-fluid' style={{ width: '70px', height: 'auto' }} src={ibm} alt="IBM" />
                <img className='img-fluid' style={{ width: '70px', height: 'auto' }} src={microsoft} alt="Microsoft" />
                <img className='img-fluid' style={{ width: '70px', height: 'auto' }} src={youtube} alt="YouTube" />
            </div>
            <Footer />
        </>
    )
}

export default Home