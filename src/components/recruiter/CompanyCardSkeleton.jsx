import React from 'react';

const SkeletonCompanyCard = () => {
    return (

        <div className='p-4 shadow-lg rounded-lg min-w-75 animate-pulse bg-white'>
            <div className='flex items-center justify-between gap-3 h-10'>
                <div className='flex items-center gap-2'>
                    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="py-2 px-4 h-8 bg-gray-300 rounded-md w-20"></div>
            </div>
        </div>

    );
};

export default SkeletonCompanyCard;
