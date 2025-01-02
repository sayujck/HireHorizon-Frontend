import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import logo from '../assets/logo.svg'
import { alljobsAPI, getJobById } from '../services/allAPI';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const View = () => {

    const [alljobs, setAlljobs] = useState([])

    const [show, setShow] = useState(false);

    useEffect(() => {
        getAllJobs()
    }, [])

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => {
        setShow(true);
    }

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

    // get job details
    const getJobDetails = async (jobId) => {
        console.log(jobId);

        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            const result = await getJobById(jobId, reqHeader)
            console.log(result.status);
            handleShow()
        }
    }

    return (
        <>
            {/* All jobs */}
            <div className="d-flex justify-content-between align-items-center container p-2">
            <h5 className='m-0'>All Jobs</h5>
                <div>
                    <Form.Select aria-label="Default select example">
                        <option value="1">Popular</option>
                        <option value="2">Latest</option>
                    </Form.Select>
                </div>
            </div>
            <div className="container mt-3">
                <div className="row">
                    {
                        alljobs.length > 0 ? (
                            alljobs.map((jobs) => (
                                <div key={jobs?._id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                                    <Card style={{ width: '100%' }}>
                                        <Card.Body>
                                            <Card.Title>{jobs?.title}</Card.Title>
                                            <Card.Subtitle className="mb-3 text-muted">
                                                {jobs?.jobType} <br />Salary: {jobs?.salary} LPA
                                            </Card.Subtitle>
                                            <div className="row mb-3 align-items-center">
                                                <div className="col-4">
                                                    <img style={{ width: '50px' }} src={logo} alt="Company Logo" />
                                                </div>
                                                <div className="col-8 text-start">
                                                    <h6 className="m-0">{jobs?.company?.name}</h6>
                                                    <p className="m-0">{jobs?.location}</p>
                                                </div>
                                            </div>
                                            <button onClick={getJobDetails} className="whitebtn w-100 mb-2">View Details</button>
                                            <button className="violetbtn w-100">Apply Now</button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))
                        ) : (
                            <div className="text-center">No jobs have been posted yet..</div>
                        )
                    }
                </div>
            </div>

            {/* Job details Modal */}
            <Modal size='lg' centered
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
                        alljobs.length > 0 ? (
                            alljobs.map((jobs) => (
                                <div key={jobs?._id}>
                                    <h5>{jobs?.title}</h5>
                                        {jobs?.jobType} <br />Salary: {jobs?.salary} LPA
                                        <h6 className="m-0">{jobs?.company?.name}</h6>
                                        <p className="m-0">{jobs?.location}</p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center">No jobs have been posted yet..</div>
                        )
                    }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default View