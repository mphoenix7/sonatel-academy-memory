import { USERS_API_URL } from "../config";
import axios from "axios";

//HTTP request to the API
const getUsers = () => {
  return axios
    .get(USERS_API_URL)
    .then((response) => response.data["hydra:member"]);
};
const getOneUser = (id) => {
  return axios.get(USERS_API_URL + "/" + id).then((response) => response.data);
};
const createUser = (user) => {
  return axios.post(USERS_API_URL, user).then((response) => response.data);
};

const editUser = (id, newData) => {
  return axios
    .put(USERS_API_URL + "/" + id, newData)
    .then((response) => response.data);
};

const deleteUser = (id) => {
  return axios.delete(USERS_API_URL + "/" + id);
};

export default {
  createUser,
  deleteUser,
  editUser,
  getUsers,
  getOneUser,
};
