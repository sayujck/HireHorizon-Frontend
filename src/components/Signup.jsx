import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { registerAPI } from '../services/allAPI';
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../redux/authSlice';
import toast from 'react-hot-toast';
import { assets } from '@/assets/assets';



const Signup = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { user } =  useSelector(store=>store.auth)

    const [userInput, setUserInput] = useState({
        fullname: "", email: "", phoneNumber: "", password: "", userType: ""
    })

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [])

    // register
    const handleRegister = async (e) => {
        e.preventDefault()
        if (userInput.fullname && userInput.email && userInput.phoneNumber && userInput.password && userInput.userType) {
            try {
                dispatch(setLoading(true))
                const result = await registerAPI(userInput)
                if (result.status == 200) {
                    setTimeout(() => {
                        navigate("/login")
                        setUserInput({ fullname: "", email: "", phoneNumber: "", password: "", userType: "" })
                    }, 1000);
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
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="container max-w-3xl bg-white shadow-xl rounded-xl p-6">
                    <h3 className="text-2xl font-semibold mb-2">Register your account</h3>
                    <div className="flex flex-col md:flex-row items-center">
                        {/* Form Section */}
                        <div className="w-full md:w-1/2 p-3">
                            <form className="space-y-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fullname</label>
                                    <input
                                        value={userInput.fullname}
                                        onChange={(e) => setUserInput({ ...userInput, fullname: e.target.value })}
                                        type="email"
                                        placeholder=" Enter fullname"
                                        className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        value={userInput.email}
                                        onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
                                        type="text"
                                        placeholder=" Enter email address"
                                        className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        value={userInput.phoneNumber}
                                        onChange={(e) => setUserInput({ ...userInput, phoneNumber: e.target.value })}
                                        type="text"
                                        placeholder=" Enter phone Number"
                                        className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <input
                                        value={userInput.password}
                                        onChange={(e) => setUserInput({ ...userInput, password: e.target.value })}
                                        type="password"
                                        placeholder=" Enter password"
                                        className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
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
                                <div className="mt-4">
                                    <button
                                        onClick={handleRegister}
                                        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition">
                                        Register
                                    </button>
                                    <p className="text-sm mt-3 text-center">
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
                                src={assets.loginImg}
                                alt="Login"
                                className="max-w-sm h-80 w-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup