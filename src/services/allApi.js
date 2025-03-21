import { commonAPI } from "./commonApi"
import { serverURL } from "./serverUrl"


//register user
export const registerAPI = async (reqBody)=>{
    return await commonAPI('POST', `${serverURL}/register`, reqBody, "")
}

//login user
export const loginAPI = async (reqBody)=>{
    return await commonAPI ('POST', `${serverURL}/login`, reqBody, "")
}

//Add Project
export const addProjectAPI = async (reqBody, reqHeader)=>{
    return await commonAPI('POST', `${serverURL}/add-project`, reqBody, reqHeader)
}

// get home project
export const getHomeProjectAPI = async()=>{
    return await commonAPI(`GET`, `${serverURL}/home-project`)
}

//get all projects
//query parameter = baseURL?key = value
export const getAllProjectsAPI = async (searchKey, reqHeader)=>{
    return await commonAPI(`GET`, `${serverURL}/all-projects?search=${searchKey}`, "" , reqHeader)
}

//get uer project
export const getUserProjectsAPI = async (reqHeader)=>{
    return await commonAPI(`GET`, `${serverURL}/user-projects`,"", reqHeader)
}

// delete user project
export const removeUserProjectAPI = async (id, reqHeader)=>{
    return await commonAPI("DELETE", `${serverURL}/remove-userproject/${id}` , {}, reqHeader)
}

//Update user project
export const updateUserProjectAPI = async(id, reqBody, reqHeader)=>{
    return await commonAPI("PUT", `${serverURL}/update-userproject/${id}`, reqBody, reqHeader)
}

//Update user profile
export const updateUserProfileAPI = async(reqBody, reqHeader)=>{
    return await commonAPI(`PUT`, `${serverURL}/update-userprofile`, reqBody, reqHeader)
}