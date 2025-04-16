import React from 'react'

const ApplicantsTableSkeleton = () => {
    return (
        <div className="p-5 border rounded-lg bg-white shadow-sm animate-pulse">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="bg-gray-200 rounded-full w-12 h-12"></div>
                    <div className="space-y-2">
                        <div className="h-4 w-40 bg-gray-200 rounded"></div>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                            <div className="h-3 w-32 bg-gray-200 rounded"></div>
                            <div className="h-3 w-24 bg-gray-200 rounded"></div>
                            <div className="h-3 w-28 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
                    <div className="h-7 w-36 bg-gray-200 rounded"></div>
                    <div className="h-4 w-8 bg-gray-200 rounded-full"></div>
                </div>
            </div>
            <div className="mt-3 pt-3 border-t flex justify-end">
                <div className="h-4 w-16 bg-gray-200 rounded-full"></div>
            </div>
        </div>
    )
}

export default ApplicantsTableSkeleton