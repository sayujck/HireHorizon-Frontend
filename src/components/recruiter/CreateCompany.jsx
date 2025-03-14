import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { registerCompanyAPI } from '@/services/allAPI'
import { setSingleCompany } from '@/redux/companySlice'
import { Loader2 } from 'lucide-react'

const CompanyCreate = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [companyDetails, setCompanyDetails] = useState({
        companyName: "",
        description: "",
        website: "",
        location: "",
        logo: ""
    });
    const changeEventHandler = (e) => {
        setCompanyDetails({ ...companyDetails, [e.target.name]: e.target.value })
    }

    const { companyName, description, website, location, logo } = companyDetails
    const reqBody = new FormData()
    reqBody.append("companyName", companyName)
    reqBody.append("description", description)
    reqBody.append("website", website)
    reqBody.append("location", location)
    reqBody.append("logo", logo)



    const registerNewCompany = async () => {
        setLoading(true)
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            };

            try {
                if (companyDetails) {
                    const result = await registerCompanyAPI(reqBody, reqHeader)
                    console.log(result);

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
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <div>
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name? you can change this later.</p>
                </div>
               <div>
                    <Label>Company Name</Label>
                    <Input
                        type="text"
                        name="companyName"
                        placeholder="Google, Microsoft etc."
                        onChange={changeEventHandler}
                    />
               </div>
                <div>
                    <Label>Description</Label>
                    <Input
                        type="text"
                        name="description"
                        value={companyDetails.description}
                        onChange={changeEventHandler}

                    />
                </div>
                <div>
                    <Label>Website</Label>
                    <Input
                        type="text"
                        name="website"
                        value={companyDetails.website}
                        onChange={changeEventHandler}
                    />
                </div>
                <div>
                    <Label>Location</Label>
                    <Input
                        type="text"
                        name="location"
                        value={companyDetails.location}
                        onChange={changeEventHandler}

                    />
                </div>
                <div>
                    <Label>Logo</Label>
                    <Input onChange={e => setCompanyDetails({ ...companyDetails, logo: e.target.files[0] })} id="logo" type="file" />
                </div>
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/recruiter/companies")}>Cancel</Button>
                    {
                        loading ? <Button className='border bg-black text-white'>Creating<Loader2 className="mr-2 h-4 w-4 animate-spin" /></Button> : <Button onClick={registerNewCompany} className='border bg-black text-white'>Continue</Button>
                    }

                </div>
            </div>
        </div>
    )
}

export default CompanyCreate