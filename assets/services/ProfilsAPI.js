import axios from "axios";
import { PROFILS_API_URL } from "../config";

//HTTP request to the API
const getProfils = () => {
  return axios
    .get(PROFILS_API_URL)
    .then((response) => response.data["hydra:member"]);
};

const createProfil = (roles) => {
  return axios.post(PROFILS_API_URL, roles);
};

const editProfil = (id, newData) => {
  return axios.put(PROFILS_API_URL + "/" + id, newData);
};

const deleteProfil = (id) => {
  return axios.delete(PROFILS_API_URL + "/" + id);
};

const getOneProfil = (id) => {
  return axios
    .get(PROFILS_API_URL + "/" + id)
    .then((response) => response.data);
};
export default {
  getProfils,
  getOneProfil,
  createProfil,
  editProfil,
  deleteProfil,
};
