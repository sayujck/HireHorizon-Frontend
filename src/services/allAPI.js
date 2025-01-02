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
// get all-jobs API
export const alljobsAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/api/v1/job/get`,{},reqHeader)
}
// get job by id
export const getJobById = async(jobId,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/api/v1/get/${jobId}`,{},jobId,reqHeader)
}
