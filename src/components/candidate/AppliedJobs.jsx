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
            <h4 className='text-2xl font-semibold mb-4'>Applied Jobs</h4>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Job Role</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appliedJobs?.map((job) => (
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{job?.createdAt.slice(0, 10)}</TableCell>
                                <TableCell>{job?.job?.title}</TableCell>
                                <TableCell>{job?.job?.company.name}</TableCell>
                                <TableCell><Badge variant="outline">{job?.status}</Badge></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default AppliedJobs