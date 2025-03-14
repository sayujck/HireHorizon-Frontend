import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { getApplicantsAPI, updateStatusAPI } from '@/services/allAPI';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner'

const ApplicantsTable = () => {
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const getApplicants = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            setLoading(true);
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            try {
                const res = await getApplicantsAPI(id, reqHeader)
                if (res.status === 200) {
                    setApplicants(res.data.applications);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response?.data?.message || "Failed to fetch applicants");
            } finally {
                setLoading(false);
            }
        }
    }

    const updateStatusHandler = async (status, applicationId) => {
        const token = sessionStorage.getItem("token");
        if (token) {
            setLoading(true);
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const res = await updateStatusAPI(applicationId, status, reqHeader);
                if (res.status === 200) {
                    toast.success(res.data.message);
                    getApplicants();
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response?.data?.message || "Failed to update status");
            } finally {
                setLoading(false);
            }
        }
    }


    useEffect(() => {
        getApplicants();
    }, [id]);

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">Loading...</TableCell>
                        </TableRow>
                    ) : applicants.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">No applicants found</TableCell>
                        </TableRow>
                    ) : (
                        applicants.map((application) => (
                            <TableRow key={application._id}>
                                <TableCell>{application.applicant.fullname}</TableCell>
                                <TableCell>{application.applicant.email}</TableCell>
                                <TableCell>{application.applicant.phoneNumber}</TableCell>
                                <TableCell>
                                    {application.applicant.profile.resume ? (
                                        <a
                                            href={application.applicant.profile.resume}
                                            className="text-blue-600 cursor-pointer"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {application.applicant.profile.resumeName}
                                        </a>
                                    ) : (
                                        <span>NA</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {new Date(application.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="float-right cursor-pointer">
                                    <TableCell className="float-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-25 h-15 flex flex-col justify-center items-center gap-2 p-2">
                                                <button onClick={() => updateStatusHandler("Accepted", application?._id)}>Accept</button>
                                                <button onClick={() => updateStatusHandler("Rejected", application?._id)}>Reject</button>
                                            </PopoverContent>

                                        </Popover>

                                    </TableCell>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )

}
export default ApplicantsTable
