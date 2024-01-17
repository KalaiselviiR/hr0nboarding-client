import BASE_URL from "./baseurl";
import { commonRequest } from "./commonReq";

//Hr api section

//register
export const registerHr=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/api/hr-register`,body)
}

//login
export const loginHr=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/api/hr-login`,body)
}

//Reset password
export const ResetPass=async(id,body)=>{
    return await commonRequest("PUT",`${BASE_URL}/api/hr-resetpass/${id}`,body)
}

//Add Candidate
export const addCandidate=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/api/add-candidate`,body)
}

//Get a single Candidate to fill edit form
export const getSingleCandidate=async(id)=>{
    return await commonRequest("GET",`${BASE_URL}/api/get-singlecandidate/${id}`,"")
}

//Edit Candidate
export const editCandidate=async(id,body)=>{
    return await commonRequest("PUT",`${BASE_URL}/api/edit-candidate/${id}`,body)
}

//Delete a Candidate
export const deleteCandidate=async(id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/api/delete-candidate/${id}`,"")
}

//get all Candidates to Display in table
export const getallCandidates=async(body)=>{
    return await commonRequest("GET",`${BASE_URL}/api/get-candidates`,body)
}


//recruiter view
export const CreatePro=async(body,headers)=>{
    return await commonRequest("POST",`${BASE_URL}/api/recruiter-view`,body,headers)
}

//Candidate Api






