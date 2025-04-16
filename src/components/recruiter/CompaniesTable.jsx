import React, { useState, useEffect } from 'react';
import { Edit2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies, searchQuery } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const filteredCompany = companies.filter(company =>
            !searchQuery || company?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilterCompany(filteredCompany);
    }, [companies, searchQuery]);


    return (
        <div className='flex justify-center p-5'>
            {
                filterCompany.length > 0 ? (
                <div className='grid md:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-5'>
                    {
                        filterCompany?.map(company => (
                            <div key={company._id} className='p-4 shadow-lg rounded-lg min-w-75'>
                                <div className='flex items-center justify-between gap-3 h-10'>
                                    <div className='flex items-center gap-2'>
                                        <img src={company.logo} alt="logo" className="w-10 h-10 rounded-full" />
                                        <h1 className="text-md font-semibold text-gray-700 w-30 h-10 flex items-center">{company.name}</h1>
                                    </div>
                                    <button onClick={() => navigate(`/recruiter/companies/${company._id}`)} className="py-1 px-3 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition text-sm flex items-center gap-1"><Edit2 className='w-4' />Edit</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                ) :
                    <div className='mt-5 text-xl text-gray-700'>No companies found</div>
            }
        </div>
    );
};

export default CompaniesTable;
