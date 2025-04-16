import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAppContext } from '@/context/AppContext'
import { assets } from '@/assets/assets'

const Banner = () => {

    const { setQuery } = useAppContext()
    const navigate = useNavigate()
    const {user} = useSelector(store => store.auth)
    const [searchQuery, setSearchQuery] = useState({
        title: "", location: ""
    })

    const findJob = () => {
        if (user) {
            setQuery(searchQuery)
            navigate('/jobs')
        }
        else {
            toast.error("Please login to find a job")
        }
    }


    return (
        <>
            <div className="heroSection rounded-2xl md:shadow-xl m-5 p-8 flex flex-col md:flex-row justify-between items-center md:mx-20 md:px-20 md:my-8">
                {/* Banner Content */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-semibold">
                        Find a job that aligns with your interests and skills
                    </h1>
                    <p className="mt-4 pb-4 text-gray-600">
                        Thousands of jobs in all the leading sectors are waiting for you.
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-3 mt-4">

                        <div className="flex items-center border rounded-lg p-1.5 w-full max-w-60 md:w-40">
                            <i className="fa-solid fa-magnifying-glass text-sm text-gray-500 mr-1"></i>
                            <input
                                type="text"
                                onChange={e => setSearchQuery({ ...searchQuery, title: e.target.value })}
                                placeholder="Job title, Keyword..."
                                className="outline-none w-full text-sm  bg-transparent"
                            />
                        </div>

                        <div className="flex items-center border rounded-lg p-1.5 w-full max-w-60 md:w-40">
                            <i className="fa-solid fa-location-dot text-sm  text-gray-500 mr-2"></i>
                            <input
                                type="text"
                                placeholder="Location"
                                onChange={e => setSearchQuery({ ...searchQuery, location: e.target.value })}
                                className="outline-none text-sm w-full bg-transparent"
                            />
                        </div>

                        <div>
                            <button onClick={findJob} className="w-60 md:w-30 bg-purple-700 text-white px-3 py-1.5 rounded-lg hover:bg-purple-800 transition">
                                <i className="fa-solid fa-search text-sm  mr-2"></i><span className='text-sm '>Find Job</span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Banner Image */}
                <div className="hidden md:block w-full md:w-1/2 mt-6 md:mt-0">
                    <img
                        src={assets.bannerImg}
                        alt="Hero"
                        className="w-95 max-w-md object-cover mx-auto"
                    />
                </div>
                <div className="md:hidden md:w-1/2 mt-8 md:mt-0">
                    <img
                        src={assets.bannerImg}
                        alt="Hero"
                        className="w-70 max-w-md object-cover mx-auto"
                    />
                </div>
            </div>


        </>
    )
}

export default Banner

