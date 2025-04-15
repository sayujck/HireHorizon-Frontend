import { useEffect, useState } from 'react'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import CompaniesTable from '../components/recruiter/CompaniesTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllCompanyAPI } from '@/services/allAPI'
import { setCompanies, setSearchQuery } from '@/redux/companySlice'

const Companies = () => {

    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getAllCompanies()
    }, [])


    const getAllCompanies = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const result = await getAllCompanyAPI(reqHeader)
                dispatch(setCompanies(result.data.companies))
            } catch (error) {
                console.log(error);

            }
        }
    }

    useEffect(() => {
        dispatch(setSearchQuery(input));
    }, [input]);


    return (
        <>
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between m-5'>
                    <div className='flex items-center border rounded-lg px-3 py-2 w-1/2 md:w-1/4'>
                        <i className="fa-solid fa-magnifying-glass text-sm text-gray-500"></i>
                        <input
                            className="w-full border-0 px-2 outline-none text-gray-700"
                            placeholder="Search by company"
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <Button onClick={() => navigate("/recruiter/companies/create")} className='border-1 bg-purple-700 text-white'>New Company</Button>
                </div>
                <CompaniesTable />
            </div>
        </>
    )
}

export default Companies
