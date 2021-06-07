import axios from "axios";
import jwtDecode from "jwt-decode";

const setAxiosToken = (token) => {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}
const authenticate = (credentials) => {
    return axios.post("https://localhost:8000/api/login_check", credentials).then(response => response.data.token).then(token => {
        window.localStorage.setItem('authToken', token)
        setAxiosToken(token)
    })

}
// permet de se deconnecter
const logout = () => {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"]

}

//verifie et persiste le token dans la navigateur du client
const setUpAuth = () => {
    const token = window.localStorage.getItem("authToken");
// Verifie si le token n'est pas expiré
    if (token) {
        const {exp: expirationDate} = jwtDecode(token)
        if (expirationDate * 1000 > new Date().getTime()) {
            setAxiosToken(token);
        }
    }
}

const isAuthenticated = () => {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const {exp: expirationDate} = jwtDecode(token)
        if (expirationDate * 1000 > new Date().getTime()) {
           return true
        }
    else{
            return false;
        }
    }
    else {
       return false
    }

}


export default {
    authenticate,
    logout,
    setUpAuth,
    isAuthenticated
}