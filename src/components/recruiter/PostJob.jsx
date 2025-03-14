import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { getAllCompanyAPI, postJobAPI } from '@/services/allAPI'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'


const PostJob = () => {

    const [jobDetails, setJobDetails] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        vacancy: '',
        companyId: ''
    })
    const [allCompany, setAllCompany] = useState([])
    const loading = false
    const navigate = useNavigate()

    const changeEventHandler = (e) => {
        setJobDetails({ ...jobDetails, [e.target.name]: e.target.value })
    }
    console.log(jobDetails);

    const getCompany = async () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const reqHeader = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };
            const res = await getAllCompanyAPI(reqHeader)
            setAllCompany(res.data.companies);
        }
    }

    useEffect(() => {
        getCompany()
    }, [])

    const postJob = async (e) => {
        e.preventDefault()
        console.log(jobDetails);
        const token = sessionStorage.getItem('token');
        if (token) {
            const reqHeader = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };
            try {
                const res = await postJobAPI(jobDetails, reqHeader)
                if (res.status === 201) {
                    toast.success(res.data.message);
                    setJobDetails({
                        title: '',
                        description: '',
                        requirements: '',
                        salary: '',
                        location: '',
                        jobType: '',
                        experience: '',
                        vacancy: '',
                        companyId: ''
                    });
                    navigate('/recruiter/jobs')
                } else {
                    toast.error(res.data.message || "Failed to post job");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
                <div className='flex items-center mx-80 w-screen my-5'>
                    <Button
                        onClick={() => navigate('/recruiter/jobs')}
                        variant="outline"
                        className="flex items-center gap-2 text-gray-500 font-semibold"
                    >
                        <ArrowLeft />
                        <span>Back</span>
                    </Button>
                </div>
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={postJob} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={jobDetails.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={jobDetails.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={jobDetails.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={jobDetails.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={jobDetails.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={jobDetails.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={jobDetails.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>No of Postion</Label>
                            <Input
                                type="number"
                                name="vacancy"
                                value={jobDetails.vacancy}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <Select onValueChange={(value) => setJobDetails({ ...jobDetails, companyId: value })}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a Company" />
                            </SelectTrigger>
                            <SelectContent>
                                {allCompany.map((company) => (
                                    <SelectItem key={company._id} value={company._id}>
                                        {company.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {
                        loading ?
                            <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4 border">Post New Job</Button>
                    }

                    <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a jobs</p>

                </form>
            </div>
        </>
    )

}

export default PostJob