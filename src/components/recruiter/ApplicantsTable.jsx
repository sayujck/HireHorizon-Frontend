import React, { useEffect, useState } from 'react'
import { FileText, Mail, MoreHorizontal, Phone } from 'lucide-react';
import { getApplicantsAPI, updateStatusAPI } from '@/services/allAPI';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { CheckCircle2, XCircle } from 'lucide-react';
import ApplicantsTableSkeleton from './ApplicantsTableSkeleton';

const ApplicantsTable = () => {
    const [applicants, setApplicants] = useState([]);
    const { id } = useParams();
    const [loading,setLoading] = useState(true)

    const getApplicants = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            try {
                const res = await getApplicantsAPI(id, reqHeader)
                if (res.status === 200) {
                    setApplicants(res.data.applications);
                    console.log(res.data.applications);
                    
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
            }
        }
    }

    useEffect(() => {
        getApplicants();
    }, [id]);

    return (

        <div>
            {
                loading ? (<ApplicantsTableSkeleton />

                ) : (
                    <div>
                        {applicants.length > 0 ? (
                            <div className="space-y-4 min-w-60">
                                {applicants.map((application) => (
                                    <div key={application._id} className="p-5 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                            <div className="flex items-start gap-4">
                                                <div className="bg-orange-100 border-amber-500 rounded-full w-12 h-12 flex items-center justify-center text-lg font-semibold">
                                                    {application.applicant.fullname.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-900">{application.applicant.fullname}</h3>
                                                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm">
                                                        <div className='flex items-center gap-1'>
                                                            <Mail className="w-4 text-gray-600" />
                                                            <p className="text-gray-600">{application.applicant.email}</p>
                                                        </div>
                                                        <div className='flex items-center gap-1'>
                                                            <Phone className="w-4 text-gray-600" />
                                                            <p className="text-gray-600">{application.applicant.phoneNumber}</p>
                                                        </div>
                                                        <p className="text-gray-500">
                                                            Applied: {new Date(application.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
                                                {application.applicant.profile?.resume ? (
                                                    <a
                                                        href={application.applicant.profile.resume}
                                                        className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors flex items-center gap-1"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <FileText className="w-4 h-4" />
                                                        {application.applicant.profile.resumeName || 'View Resume'}
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">No resume</span>
                                                )}
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <button className="p-1.5 rounded-full hover:bg-gray-100 focus:outline-none">
                                                            <MoreHorizontal className="w-5 h-5 text-gray-600 hover:text-gray-900" />
                                                        </button>
                                                    </DropdownMenuTrigger>

                                                    <DropdownMenuContent
                                                        className="w-35 bg-white rounded-md shadow-lg py-1 z-50"
                                                        align="end"
                                                        sideOffset={5}
                                                    >
                                                        <DropdownMenuItem
                                                            onClick={() => updateStatusHandler("Accepted", application._id)}
                                                            className="px-4 py-2 text-sm flex items-center gap-2 hover:bg-green-50 cursor-pointer"
                                                        >
                                                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                                                            <span className="text-green-700 font-medium">Accept</span>
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem
                                                            onClick={() => updateStatusHandler("Rejected", application._id)}
                                                            className="px-4 py-2 text-sm flex items-center gap-2 hover:bg-red-50 cursor-pointer"
                                                        >
                                                            <XCircle className="w-4 h-4 text-red-600" />
                                                            <span className="text-red-700 font-medium">Reject</span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                        {application.status && (
                                            <div className="mt-3 pt-3 border-t flex justify-end">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${application.status === "accepted"
                                                    ? "bg-green-100 text-green-800"
                                                    : application.status === "rejected"
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-gray-100 text-gray-800"
                                                    }`}>
                                                    {application.status}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : <div className='mt-10 text-xl text-gray-700 text-center'> No Application Found</div>
                        }
                    </div>)
            }
        </div>
    )

}
export default ApplicantsTable
