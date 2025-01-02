import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import hero from '../assets/hero.png'
import { Card } from 'react-bootstrap'
import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import  google from '../assets/company/google.png'
import  flipkart from '../assets/company/flipkart.png'
import  ibm from '../assets/company/ibm.png'
import  microsoft from '../assets/company/microsoft.png'
import  youtube from '../assets/company/youtube.png'
import Footer from '../components/Footer'

const Home = () => {
    const [authorisedUser,setAuthorisedUser] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
          setAuthorisedUser(true)
        }
      },[])

      const viewAllProjects =()=>{
        const token = sessionStorage.getItem("token")
        if (token) {   
            navigate('/jobs')
        }
        else {
            console.log("No token found");
        }
      }
      
  return (
    <>
     <Header authorisedUser={authorisedUser}/>
     {/* Hero section */}
     <div className='heroSection pt-5 d-flex justify-content-center gap-5'>
        <div className="heroContent mt-4">
            <h1 className='mt-5 fs-1' style={{width:'600px'}}>Find a job that aligns with your interests and skills</h1>
            <p className='mt-3 pb-3'>Thousands of jobs in all the leading sector are waiting for you.</p>
            <div style={{width:'465px',left:"0%"}} className='mt-4 py-2 px-2 bg-white border 1px rounded'>
              <i class="fa-solid fa-magnifying-glass mx-2"></i>
              <input style={{width:'165px'}} className='p-1 border border-0 me-2' type="text" placeholder='Job title, Keyword...' />
              <i class="fa-solid fa-location-dot me-2"></i>
              <input style={{width:'100px'}} className='p-2 border border-0' type="text" placeholder='Location'/>
              <button className='findJobBtn ms-3'>Find Job</button>
            </div>
            
        </div>
        <div className="heroImage">
            <img style={{width:'400px',height:'400px'}} src={hero} alt="" />
        </div>
     </div>

     {/* Featured */}
     <div className='featured mt-5'>
        <div className='text-center'>
          <h2>Featured Jobs</h2>
          <p>Choose jobs from the top employers and apply for the same.</p>
        </div>
        <div className='d-flex justify-content-center mt-5 gap-4'>
          {/* job card */}
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                <Card.Title>Technical Support Specialist</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">PART-TIME salary:20,000 INR-25,000 INR</Card.Subtitle>
                <div className='row'>
                    <div className='col-lg-2'>
                        <img style={{width:'50px',display:'inline'}} src={logo} alt="" />
                    </div>
                    <div className='col-lg-10'>
                        <h6>Google Inc.</h6>
                        <p>New Delhi, India</p>
                    </div>
                </div>
                <button className='whitebtn me-3'>View Details</button>
                <button className='violetbtn'>Apply now</button> 
                </Card.Body>
            </Card>
            {/* job card */}
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                <Card.Title>Technical Support Specialist</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">PART-TIME salary:20,000 INR-25,000 INR</Card.Subtitle>
                <div className='row'>
                    <div className='col-lg-2'>
                        <img style={{width:'50px',display:'inline'}} src={logo} alt="" />
                    </div>
                    <div className='col-lg-10'>
                        <h6>Google Inc.</h6>
                        <p>New Delhi, India</p>
                    </div>
                </div>
                <button className='whitebtn me-3'>View Details</button>
                <button className='violetbtn'>Apply now</button> 
                </Card.Body>
            </Card>
            {/* job card */}
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                <Card.Title>Technical Support Specialist</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">PART-TIME salary:20,000 INR-25,000 INR</Card.Subtitle>
                <div className='row'>
                    <div className='col-lg-2'>
                        <img style={{width:'50px',display:'inline'}} src={logo} alt="" />
                    </div>
                    <div className='col-lg-10'>
                        <h6>Google Inc.</h6>
                        <p>New Delhi, India</p>
                    </div>
                </div>
                <button className='whitebtn me-3'>View Details</button>
                <button className='violetbtn'>Apply now</button> 
                </Card.Body>
            </Card>
        </div>

        
        <div className="text-center my-4">
          <button className='border-0 bg-white text-primary text-decoration-underline' onClick={viewAllProjects}>View all</button>
        </div>
     </div>

     <p className='text-center mt-5 py-4'>Top companies hiring now</p>
     <div className='d-flex justify-content-center align-items-center mb-5'>
      <img className='me-5' style={{width:'70px',height:'50px'}} src={google} alt="" />
      <img className='me-5'  style={{width:'110px',height:'40px'}} src={flipkart} alt="" />
      <img className='me-5'  style={{width:'70px',height:'50px'}} src={ibm} alt="" />
      <img className='me-5'  style={{width:'70px',height:'50px'}} src={microsoft} alt="" />
      <img className='me-5'  style={{width:'70px',height:'50px'}} src={youtube} alt="" />
     </div>
     <Footer/>
    </>
  )
}

export default Home