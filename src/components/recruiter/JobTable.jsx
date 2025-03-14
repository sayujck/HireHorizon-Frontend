import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Eye, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getJobByRecruiterAPI } from '@/services/allAPI'

const JobTable = ({ searchJobByText }) => {

    const [allJobs, setAllJobs] = useState()
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const navigate = useNavigate();

    const getJobsByRecruiter = async () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const reqHeader = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };
            try {
                const result = await getJobByRecruiterAPI(reqHeader)
                setAllJobs(result.data.jobs)

            } catch (error) {
                console.log(error);

            }
        }
    }


    useEffect(() => {
        getJobsByRecruiter()
    }, [])

    useEffect(() => {

        const filteredJobs = allJobs?.filter((job) => {
            if (!searchJobByText) {
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    }, [allJobs, searchJobByText])
    

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map(job => (
                            <tr>
                                <TableCell className='flex items-center gap-2'>{<img src={job?.company?.logo} alt="company logo" className='w-10 h-10 rounded-full' />} {job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.updatedAt.slice(0, 10)}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32 h-8 flex justify-center items-center">
                                            <div onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer'>
                                                <Eye className='w-4' />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default JobTable