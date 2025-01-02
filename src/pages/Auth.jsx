import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import loginImg from '../assets/loginImg.png'
import { FloatingLabel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { loginAPI, registerAPI } from '../services/allAPI';


const Auth = ({ insideRegister }) => {
  const navigate = useNavigate()
  const [userInput, setUserInput] = useState({
    fullname: "", email: "", phoneNumber: "", password: "", userType: ""
  })
  // console.log(userInput);

  // register API
  const handleRegister = async (e) => {
    e.preventDefault()
    if (userInput.fullname && userInput.email && userInput.phoneNumber && userInput.password && userInput.userType) {
      try {

        const result = await registerAPI(userInput)

        if (result.status == 200) {
          alert(`Welcome ${result.data?.fullname}, Please login`)
          navigate("/login")
          setUserInput({ fullname: "", email: "", phoneNumber: "", password: "", userType: "" })
        }
        else {
          if (result.response.status == 406) {
            alert(result.response.data)
            setUserInput({ fullname: "", email: "", phoneNumber: "", password: "" })
          }
        }

      } catch (err) {
        console.log(err);
      }
    }
    else {
      alert("Fill the form completely")
    }
  }

  // login API
  const handleLogin = async (e) => {
    e.preventDefault()
    if (userInput.email && userInput.password && userInput.userType) {
      try {
        const result = await loginAPI(userInput)
        if (result.status == 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user))
          sessionStorage.setItem("token", result.data.token)
          alert("Login Successfull")
          setTimeout(() => {
            navigate("/")
            setUserInput({ email: "", password: "", userType: "" })
          }, 2000);

        }
        else {
          if (result.response.status == 404) {
            alert(result.response.data)
            setUserInput({ email: "", password: "", userType: "" })
          }
        }

      } catch (err) {
        console.log(err);
      }
    }
    else {
      alert("Fill the form completely")
    }
  }



  return (
    <>
      <Header />
      <div style={{ minHeight: '100vh', width: '100%' }} className=' align-items-center'>
        <div className="container w-75">
          <h3 className='mt-3 mb-4'>Login to your Account</h3>
          <div className="card shadow">
            <div className="row align">
              <div className="col-lg-6">
                <Form style={{ width: '450px' }} className='m-4 p-4 pb-2'>
                  {
                    insideRegister && (
                      <>
                        <h6>Full Name</h6>
                        <FloatingLabel controlId="floatingInput" label="Full name" className="mb-3">
                          <Form.Control value={userInput.fullname} onChange={e => setUserInput({ ...userInput,fullname:e.target.value })} type="text" placeholder="" />
                        </FloatingLabel>
                      </>
                    )
                  }
                        <h6>Email ID</h6>
                        <FloatingLabel controlId="floatingInput" label="Enter Email address" className="mb-3">
                          <Form.Control value={userInput.email} onChange={e => setUserInput({ ...userInput,email: e.target.value })} type="email" placeholder="name@example.com" />
                        </FloatingLabel>
                   { insideRegister && (
                     <>
                        <h6 className='mt-4'>Phone Number</h6>
                        <FloatingLabel controlId="floatingPassword" label="Enter Phone Number">
                          <Form.Control value={userInput.phoneNumber} onChange={e => setUserInput({ ...userInput,phoneNumber: e.target.value })} type="text" placeholder="" />
                        </FloatingLabel>
                      </>
                    )
                  }
                  <h6 className='mt-4'>Password</h6>
                  <FloatingLabel controlId="floatingPassword" label="Enter Password">
                    <Form.Control value={userInput.password} onChange={e => setUserInput({ ...userInput,password: e.target.value })} type="password" placeholder="Password" />
                  </FloatingLabel>

                  <div className="d-flex my-3">
                    <Form.Check
                      type="radio"
                      className="me-3"
                      id="student"
                      value="candidate"
                      name="userType"
                      label="Candidate"
                      checked={userInput.userType === "candidate"}
                      onChange={e => setUserInput({ ...userInput, userType: e.target.value })}
                    />
                    <Form.Check
                      type="radio"
                      id="recruiter"
                      value="recruiter"
                      name="userType"
                      label="Recruiter"
                      checked={userInput.userType === "recruiter"}
                      onChange={e => setUserInput({ ...userInput, userType: e.target.value })}
                    />
                  </div>

                  {
                    insideRegister ?
                      <div className='mt-4'>
                        <button onClick={handleRegister} className='btn btn-primary p-2 w-100'>Register
                        </button>
                        <p className='mt-4'>Existing User? Please Click here to <Link to={'/login'}>Login</Link></p>
                      </div>
                      :
                      <div className='mt-4'>
                        <button onClick={handleLogin} className='btn btn-primary p-2 w-100'>Login</button>
                        <p className='mt-4'>Don't have an account? <Link to={'/register'}>Register</Link></p>
                      </div>
                  }
                </Form>
              </div>
              <div className="col-lg-6">
                <img style={{ width: '400px', height: '400px' }} src={loginImg} className='p-5' alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth