import React from 'react'

const SkeletonAppliedJobs = () => {
    return (
        <div className="p-5 border-gray-200 rounded-lg border-2 animate-pulse bg-white" >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <img className="rounded-full w-10 h-10 bg-gray-300 flex items-center justify-center"/>
                        <div className='flex flex-col gap-2'>
                            <div className="h-5 w-40 bg-gray-300 rounded-full"></div>
                            <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="h-5 w-35 bg-gray-200 rounded-2xl"></div>
                    <div className="h-5 w-20 bg-gray-300 px-3 py-1 rounded-full"></div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonAppliedJobs