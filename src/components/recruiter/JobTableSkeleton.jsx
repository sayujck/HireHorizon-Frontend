import React from 'react'

const JobTableSkeleton = () => {
    return (
        <div className="p-5 shadow-md rounded-xl w-72 flex flex-col items-center bg-white border border-gray-100 animate-pulse">
            <div className="w-full flex justify-between items-center h-8 mb-4">
                <h2 className="w-30 h-10 rounded-full bg-gray-200 pr-2"></h2>
                <span className="h-10 w-25 rounded-full bg-purple-100"></span>
            </div>
            <div className="flex items-center gap-3 h-20">
                <img className="w-10 h-10 rounded-full bg-gray-300" />
                <div>
                    <p className="h-7 w-20 rounded-full bg-gray-100"></p>
                </div>
                <div className='w-25'>
                    <div className="h-6 w-20 rounded-full bg-green-50"></div>
                </div>
            </div>
            <button className="mt-auto w-full h-10 bg-gray-200 rounded-lg">
            </button>
        </div>
    )
}

export default JobTableSkeleton