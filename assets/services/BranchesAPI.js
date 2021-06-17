import axios from "axios";
import {BRANCHES_API_URL} from "../config";

const getBranches = () =>{
    return axios.get(BRANCHES_API_URL).then(response => response.data["hydra:member"])
}

const createBranche = (branche) => {
    return axios.post(BRANCHES_API_URL,branche)
}

const editBranche = (id , editBranche) =>{
    return axios.put(BRANCHES_API_URL+"/"+id,editBranche)
}

const deleteBranche = (id) => {
    return axios.delete(BRANCHES_API_URL,id)
}
export default {
    getBranches,
    createBranche,
    editBranche,
    deleteBranche
}