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
export const Verifymail=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/api/hr-verify`,body)
}

//Reset password
export const ResetPassword=async(id,body)=>{
    return await commonRequest("PUT",`${BASE_URL}/api/hr-resetpass/${id}`,body)
}

//Update password
export const changePassword=async(id,body)=>{
    return await commonRequest("PUT",`${BASE_URL}/api/changePassword/:${userId}`,body)
}
 
//Add Candidate
export const addCandidate=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/api/add-candidate`,body)
}

//Get a single Candidate from token 
export const getSingleCandidate=async(token)=>{
    return await commonRequest("GET",`${BASE_URL}/api/get-singlecandidate/${token}`,"")
}
//Get a single Candidate from id
export const getSingleCandidateOutside=async(id)=>{
    return await commonRequest("GET",`${BASE_URL}/api/getSingleCandidate/${id}`,"")
}
export const getSingleCandidateById=async(id)=>{
    return await commonRequest("GET",`${BASE_URL}/api/getSingleCandidate/${id}`,"")
}

//Change Status
export const updateStatusRview=async(id)=>{
    return await commonRequest("POST",`${BASE_URL}/api/update-statusReview/${id}`,"")
}

//Edit Candidate
export const editCandidate=async(id,body)=>{
    return await commonRequest("POST",`${BASE_URL}/api/edit-candidate/${id}`,body)
}

export const verifyToken = async (id) => {
    return await commonRequest("GET", `${BASE_URL}/api/verifyToken/${token}`)
}

//Change state to delete
export const deleteCandidate=async(id)=>{
    return await commonRequest("POST",`${BASE_URL}/api/delete-candidate/${id}`,"")
}

//Delete a rejected Candidate
export const ConformdeleteCandidate=async(id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/api/delete-candidatestate/${id}`,"")
}

//Change Status
export const updateStatus=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/api/update-status`,body)
}

//get all Candidates to Display in table
export const getallCandidates=async(body)=>{
    return await commonRequest("GET",`${BASE_URL}/api/get-candidates`,body)
}


export const CreatePro=async(body,headers)=>{
    return await commonRequest("POST",`${BASE_URL}/api/recruiter-view`,body,headers)
}

//Candidate Api

//Get a single Candidate from id
export const getRecruterView=async(id)=>{
    return await commonRequest("GET",`${BASE_URL}/api/get-recruterview/${id}`,"")
}


export const createCandidateDetails=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/api/create-candidatedetails `,body)
}



export const resendCandidateForm = async(id)=>{
    return await commonRequest("POST",`${BASE_URL}/api/resend-form/${id}`)
}


//Resend Documents

export const resendDocuments=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/api/resend-documents`,body)
}
