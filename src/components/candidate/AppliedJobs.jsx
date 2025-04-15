import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Badge } from '../ui/badge';
import { getAppliedJobAPI } from '@/services/allAPI';


const AppliedJobs = () => {

    const [appliedJobs, setAppliedJobs] = useState([])

    useEffect(() => {
        getAppliedJobs()
    }, [])

    const getAppliedJobs = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const result = await getAppliedJobAPI(reqHeader)
                setAppliedJobs(result.data.application)
            } catch (error) {
                console.log(error);
            }

        }
    }

    return (
        <>
            <h4 className='p-4 text-2xl font-semibold mb-4'>Applied Jobs</h4>
            {
                appliedJobs.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table sx={{ maxWidth: 1240}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{fontWeight:700}}>Date</TableCell>
                                    <TableCell sx={{fontWeight:700}}>Job Role</TableCell>
                                    <TableCell sx={{fontWeight:700}}>Company</TableCell>
                                    <TableCell sx={{fontWeight:700}}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {appliedJobs?.map((job) => (
                                    <TableRow
                                        key={job._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{job?.createdAt.slice(0, 10)}</TableCell>
                                        <TableCell>{job?.job?.title}</TableCell>
                                        <TableCell>{job?.job?.company.name}</TableCell>
                                        <TableCell><Badge className={`${job?.status === "rejected" ? 'bg-red-400 text-white' : job.status === 'pending' ? 'bg-purple-700 text-white' : 'bg-green-400 text-white'}`} variant="outline">{job?.status}</Badge></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <div className='text-lg m-5' >Not applied for any jobs yet</div>
                )
            }

        </>
    )
}

export default AppliedJobs