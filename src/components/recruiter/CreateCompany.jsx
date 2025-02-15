import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import Header from '../Header'
import { registerCompanyAPI } from '@/services/allAPI'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
    });

    const changeEventHandler = (e) =>{
        setInput({...input,[e.target.name]:e.target.value})
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };

            try {
                if (input) {
                    console.log(input);  
                    const result = await registerCompanyAPI(input, reqHeader)
                    console.log(result.data);
                    
                    if (result.status == 201) {
                        dispatch(setSingleCompany(result.data.company))
                        toast.success(result.data.message)
                        navigate(`/recruiter/companies/`)
                    }
                    else if (result.status == 401)
                        toast.success(result.response.data.message)
                }
                else {
                    toast.error("Enter company name")
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div>
            <Header />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name? you can change this later.</p>
                </div>

                <Label>Company Name</Label>
                <Input
                    type="text"
                    name="name"
                    className="my-2"
                    placeholder="Google, Microsoft etc."
                    onChange={changeEventHandler}
                />
                <div>
                    <Label>Description</Label>
                    <Input
                        type="text"
                        name="description"
                        value={input.description}
                        onChange={changeEventHandler}

                    />
                </div>
                <div>
                    <Label>Website</Label>
                    <Input
                        type="text"
                        name="website"
                        value={input.website}
                        onChange={changeEventHandler}
                    />
                </div>
                <div>
                    <Label>Location</Label>
                    <Input
                        type="text"
                        name="location"
                        value={input.location}
                        onChange={changeEventHandler}

                    />
                </div>
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/recruiter/companies")}>Cancel</Button>
                    <Button onClick={registerNewCompany} className='border bg-black text-white'>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate