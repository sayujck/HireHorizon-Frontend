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

    useEffect(()=>{
        getAllCompanies()
    },[])


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
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by company name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/recruiter/companies/create")} className='border-1 bg-purple-700 text-white'>New Company</Button>
                </div>
                <CompaniesTable />
            </div>
        </>
    )
}

export default Companies
