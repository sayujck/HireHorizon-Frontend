import React, { useState } from 'react'
import loginImg from '../assets/loginImg.png'
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { registerAPI } from '../services/allAPI';
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../redux/authSlice';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';


const Signup = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { loading } = useSelector(store => store.auth)

    const [userInput, setUserInput] = useState({
        fullname: "", email: "", phoneNumber: "", password: "", userType: ""
    })


    // register API
    const handleRegister = async (e) => {
        console.log(userInput);
        
        e.preventDefault()
        if (userInput.fullname && userInput.email && userInput.phoneNumber && userInput.password && userInput.userType) {
            try {
                dispatch(setLoading(true))
                const result = await registerAPI(userInput)
                if (result.status == 200) {
                    setTimeout(() => {
                        navigate("/login")
                        setUserInput({ fullname: "", email: "", phoneNumber: "", password: "", userType: "" })
                    }, 2000);
                    toast.success(result.data.message)     
                }
                else {
                    if (result.response.status == 406) {
                        toast.error(result.response.data.message)
                        setUserInput({ fullname: "", email: "", phoneNumber: "", password: "", userType: "" })
                    }
                }

            } catch (err) {
                console.log(err);
            } finally {
                dispatch(setLoading(false))
            }
        }
        else {
            toast.error("Fill the form completely")
        }
    }


    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
                <div className="container max-w-4xl bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-2xl font-semibold">Register your account</h3>
                    <div className="flex flex-col md:flex-row items-center">
                        {/* Form Section */}
                        <div className="w-full md:w-1/2 p-4">
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fullname</label>
                                    <input
                                        value={userInput.fullname}
                                        onChange={(e) => setUserInput({ ...userInput, fullname: e.target.value })}
                                        type="text"
                                        placeholder="Fullname"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        value={userInput.email}
                                        onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
                                        type="text"
                                        placeholder="Email address"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        value={userInput.phoneNumber}
                                        onChange={(e) => setUserInput({ ...userInput, phoneNumber: e.target.value })}
                                        type="text"
                                        placeholder="Phone Number"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <input
                                        value={userInput.password}
                                        onChange={(e) => setUserInput({ ...userInput, password: e.target.value })}
                                        type="password"
                                        placeholder="Password"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <div className="flex items-center justify-start space-x-8 mt-3">
                                    <div className="flex items-center">
                                        <input onClick={(e) => setUserInput({ ...userInput, userType: e.target.value })} type="radio" value={'candidate'} id="candidate" name="role" className="w-4 h-4 border-gray-300 focus:ring-purple-500" />
                                        <label htmlFor="candidate" className="ml-2 text-sm font-medium text-gray-700">
                                            Candidate
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input onClick={(e) => setUserInput({ ...userInput, userType: e.target.value })} type="radio" value={'recruiter'} id="recruiter" name="role" className="w-4 h-4 border-gray-300 focus:ring-purple-500" />
                                        <label htmlFor="recruiter" className="ml-2 text-sm font-medium text-gray-700">
                                            Recruiter
                                        </label>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <button
                                        onClick={handleRegister}
                                        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition">
                                        Register
                                    </button>
                                    <p className="text-sm mt-4 text-center">
                                        Existing User? Please Click here to{' '}
                                        <Link to="/login" className="text-purple-600 hover:underline">
                                            Login
                                        </Link>
                                    </p>
                                </div>

                            </form>
                        </div>

                        {/* Image Section */}
                        <div className="w-full md:w-1/2 p-4 flex justify-center">
                            <img
                                src={loginImg}
                                alt="Login"
                                className="max-w-sm w-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup