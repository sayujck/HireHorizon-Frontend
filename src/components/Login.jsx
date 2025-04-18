import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../services/allAPI';
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../redux/authSlice';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { assets } from '@/assets/assets';

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { loading, user } = useSelector(store => store.auth)

    const [userInput, setUserInput] = useState({
        email: "", password: "", userType: ""
    })

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [])

    // login
    const handleLogin = async (e) => {
        e.preventDefault()
        if (userInput.email && userInput.password && userInput.userType) {
            try {
                dispatch(setLoading(true))
                const result = await loginAPI(userInput)
                if (result.status == 200) {
                    dispatch(setUser(result.data.user))
                    sessionStorage.setItem("token", result.data.token)
                    setTimeout(() => {
                        if (userInput.userType == 'recruiter') {
                            navigate('/recruiter/jobs')
                        }
                        else
                            navigate("/")
                        setUserInput({ email: "", password: "", userType: "" })
                    }, 1000);
                    toast.success(result.data.message)

                }
                else {
                    if (result.response.status == 404) {
                        toast.error(result.response.data.message)
                    }
                    else if (result.response.status == 401) {
                        toast.error(result.response.data.message)
                    }

                    else if (result.response.status == 402)
                        toast.error(result.response.data.message)
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
            <div className="love min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="container max-w-3xl bg-white shadow-xl rounded-2xl p-6">
                    <h3 className="text-2xl font-semibold mb-2">Login your account</h3>
                    <div className="flex flex-col md:flex-row items-center">

                        {/* Form Section */}
                        <div className="w-full md:w-1/2 pt-0 p-4">
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        value={userInput.email}
                                        onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
                                        type="text"
                                        placeholder="Email address"
                                        className="w-full p-2 border outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <input
                                        value={userInput.password}
                                        onChange={(e) => setUserInput({ ...userInput, password: e.target.value })}
                                        type="password"
                                        placeholder="Password"
                                        className="w-full p-2 border outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <div className="flex items-center justify-start space-x-8 mt-3">
                                    <div className="flex items-center">
                                        <input onClick={(e) => setUserInput({ ...userInput, userType: e.target.value })} type="radio" value={'candidate'} id="candidate" name="role" className="w-4 h-4" />
                                        <label htmlFor="candidate" className="ml-2 text-sm font-medium text-gray-700">
                                            Candidate
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input onClick={(e) => setUserInput({ ...userInput, userType: e.target.value })} type="radio" value={'recruiter'} id="recruiter" name="role" className="w-4 h-4" />
                                        <label htmlFor="recruiter" className="ml-2 text-sm font-medium text-gray-700">
                                            Recruiter
                                        </label>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    {
                                        loading ?
                                            <Button className='w-full border py-2 rounded-md'> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait</Button>
                                            :
                                            <button
                                                onClick={handleLogin}
                                                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition">
                                                Login
                                            </button>
                                    }
                                    <p className="text-sm mt-4 text-center">
                                        Don't have an account?{' '}
                                        <Link to="/register" className="text-purple-600 hover:underline">
                                            Register
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>

                        {/* Image Section */}
                        <div className="w-full md:w-1/2 p-4 flex justify-center">
                            <img
                                src={assets.loginImg}
                                alt="Login"
                                className="max-w-sm h-75 w-full object-contain"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login