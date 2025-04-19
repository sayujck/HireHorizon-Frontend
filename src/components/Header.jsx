import { assets } from '@/assets/assets'
import store from '@/redux/store'
import { LogOutIcon, User2 } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { persistStore } from 'redux-persist'


const Header = () => {

    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.auth)

    const navigate = useNavigate()
    const persistor = persistStore(store);

    const logout = () => {
        persistor.purge();
        navigate("/");
        window.location.reload();
        sessionStorage.clear();
    }

    return (
        <nav className="flex items-center justify-between px-6 md:px-8 lg:px-10 xl:px-12 py-3 border-gray-300 bg-white relative transition-all">
            <NavLink to={'/'}><p className='text-xl font-semibold md:text-2xl md:font-bold'>HireHorizon</p></NavLink>
            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-4">
                {user?.userType === "recruiter" ? (
                    <>
                        <NavLink to="/recruiter/jobs" className="block text-lg font-semibold">Jobs</NavLink>
                        <NavLink to="/recruiter/companies" className="block text-lg font-semibold">Companies</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to={'/'} className="block text-lg font-semibold">Home</NavLink>
                        <div onClick={() => {
                            user ? navigate("/jobs") : toast.error("Please login to view jobs");
                        }} className="block text-lg font-semibold cursor-pointer">Jobs</div>
                    </>
                )
                }
                <NavLink to={'#'} className="block text-lg font-semibold">About Us</NavLink>
                <NavLink to={'#'} className="block text-lg font-semibold">Contact</NavLink>
            </div>
            {
                !user ? (
                    <div className='hidden sm:flex items-center gap-2'>
                        <button onClick={() => navigate('/login')} className="cursor-pointer px-5 py-1.5 bg-purple-700 text-sm hover:bg-purple-800 transition text-white rounded-full">
                            Login
                        </button>
                        <button onClick={() => navigate('/register')} className="cursor-pointer px-5 py-1.5 bg-purple-700 text-sm hover:bg-purple-800 transition text-white rounded-full">
                            Signup
                        </button>
                    </div>
                ) : (
                    user.userType == 'recruiter' ? (
                        <div className='hidden relative group md:block'>
                            <img src={user.profile.profilePic ? user.profile.profilePic : assets.profile_icon} className='w-10 h-10 rounded-full' alt="" />
                            <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded z-40'>
                            <li onClick={logout} className='pl-4 cursor-pointer flex items-center gap-2'><LogOutIcon className='w-5'/>Logout</li>
                            </ul>
                        </div>
                    ) : (
                        <div className={`hidden relative group sm:block md:block lg:block`}>
                            <img src={user.profile.profilePic ? user.profile.profilePic : assets.profile_icon} className='w-10 h-10 rounded-full' alt="" />
                            <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-35 rounded z-40'>
                                <li onClick={() => navigate('/profile')} className='pl-4 cursor-pointer flex items-center gap-2 mb-2'><User2 className='w-5'/>My Profile</li>
                                <li onClick={logout} className='pl-4 cursor-pointer flex items-center gap-2'><LogOutIcon className='w-5'/>Logout</li>
                            </ul>
                        </div>
                    )
                )
            }
            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>

            {/* Mobile Menu */}
            <div onClick={() => open ? setOpen(false) : setOpen(true)} className={`${open ? 'flex' : 'hidden'} absolute top-[40px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-6 text-sm md:hidden`}>
                {
                    user?.userType == 'recruiter' ? (
                        <>
                            <NavLink to="/recruiter/jobs" className="block text-md font-semibold">Jobs</NavLink>
                            <NavLink to="/recruiter/companies" className="block text-md font-semibold">Companies</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to={'/'} className="block text-md font-semibold">Home</NavLink>
                            <div onClick={() => {
                                user ? navigate("/jobs") : toast.error("Please login to view jobs");
                            }} className="block text-md font-semibold cursor-pointer">Find Jobs</div>
                        </>
                    )
                }

                <NavLink to={'/'} className="block text-md font-semibold">About Us</NavLink>
                {
                    !user ? (
                        <div>
                            <button onClick={() => navigate('/login')} className="cursor-pointer px-4 py-1.5 mt-2 mr-2 bg-purple-700 hover:bg-purple-800 transition text-white rounded-full text-sm">
                                Login
                            </button>
                            <button onClick={() => navigate('/register')} className="cursor-pointer px-4 py-1.5 bg-purple-700 hover:bg-purple-800 transition text-white rounded-full text-sm">
                                Signup
                            </button>
                        </div>
                    ) : (
                        user.userType == 'recruiter' ? (
                            <div className='relative group md:hidden'>
                                <img src={user.profile.profilePic ? user.profile.profilePic : assets.profile_icon} className='w-10 h-10 rounded-full' alt="" />
                                <ul className='hidden group-hover:block absolute top-10 left-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded z-40'>
                                <li onClick={logout} className='pl-4 cursor-pointer flex items-center gap-2'><LogOutIcon className='w-5'/>Logout</li>
                                </ul>
                            </div>
                        ) : (
                            <div className={`relative group sm:block`}>
                                <img src={user.profile.profilePic ? user.profile.profilePic : assets.profile_icon} className='w-10 h-10 rounded-full' alt="" />
                                <ul className='hidden group-hover:block absolute top-10 left-0 bg-white shadow border border-gray-200 py-2.5 w-35 rounded z-40'>
                                    <li onClick={() => navigate('/profile')} className='pl-4 cursor-pointer flex items-center gap-2 mb-2'><User2 className='w-5'/>My Profile</li>
                                    <li onClick={logout} className='pl-4 cursor-pointer flex items-center gap-2'><LogOutIcon className='w-5'/>Logout</li>
                                </ul>
                            </div>
                        )
                    )
                }

            </div>
        </nav >
    )
}


export default Header