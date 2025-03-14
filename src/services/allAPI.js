import commonAPI from "./commonAPI";
import SERVER_BASE_URL from "./serverURL";

// register API
export const registerAPI = async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/api/v1/user/register`,reqBody)
}
// login API
export const loginAPI = async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/api/v1/user/login`,reqBody)
}
// profile update
export const updateProfileAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_BASE_URL}/api/v1/user/profile/update`,reqBody,reqHeader)
}


// get latest-jobs API
export const latestjobsAPI = async()=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/api/v1/job/getlatest`,{})
}
// get all-jobs API
export const alljobsAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/api/v1/job/get`,{},reqHeader)
}
// get job by id
export const getJobById = async(jobId,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/api/v1/job/get/${jobId}`,{},reqHeader)
}
// apply job
export const applyJobAPI = async(jobId,reqBody)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/api/v1/application/apply/${jobId}`,{},reqBody)
}
//get applied  jobs
export const getAppliedJobAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/api/v1/application/get`,{},reqHeader)
}


// register company
export const registerCompanyAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/api/v1/company/register`,reqBody,reqHeader)
}
// get all company by user
export const getAllCompanyAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/api/v1/company/get`,{},reqHeader)
}
// get company by id
export const getCompanyByIdAPI = async(companyId,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/api/v1/company/get/${companyId}`,{},reqHeader)
}
// update company by Id
export const updateCompanyByIdAPI = async(reqBody,reqHeader,companyId)=>{
    return await commonAPI("PUT",`${SERVER_BASE_URL}/api/v1/company/update/${companyId}`,reqBody,reqHeader)
}


// get jobs created by recruiter
export const getJobByRecruiterAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/api/v1/job/getrecruiterjobs`,{},reqHeader)
}
// post job
export const postJobAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/api/v1/job/post`,reqBody,reqHeader)
}
// get applicants by job id
export const getApplicantsAPI = async(jobId,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/api/v1/application/${jobId}/applicants`,{},reqHeader)
}
// update status
export const updateStatusAPI = async(applicationId,status,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/api/v1/application/status/${applicationId}/update`,{status},reqHeader)
}
