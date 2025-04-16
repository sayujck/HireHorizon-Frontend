import React from 'react'

const SkeletonJobCard = () => {
    return (
        <>
            <div className="flex flex-col p-5 w-65 bg-white border border-gray-200 rounded-lg shadow-sm animate-pulse h-full">
                <div className="mb-2 min-h-[3rem] flex flex-col gap-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="flex gap-2 mt-auto">
                        <span className="h-5 w-16 rounded-full bg-purple-100"></span>
                        <span className="h-5 w-20 rounded-full bg-green-100"></span>
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-2 min-h-[3.5rem]">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-1">
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                    </div>
                </div>

                <div className="flex gap-2 mt-auto">
                    <div className="w-full py-2 px-2 bg-gray-100 rounded-md h-8"></div>
                    <div className="w-full py-2 px-2 bg-gray-200 rounded-md h-8"></div>
                </div>
            </div>
        </>
    )
}

export default SkeletonJobCard