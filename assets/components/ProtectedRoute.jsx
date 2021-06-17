import React from "react";
import {Route, Redirect} from "react-router-dom"

const ProtectedRoute = ({path, isAuthenticated,component ,profil , acceptedProfil}) =>{
    if(!isAuthenticated){
        return <Redirect to="/" />
    }
    if(isAuthenticated && (profil.toString() !== acceptedProfil)){
        return <Redirect to="/home"/>
    }

    return <Route path={path} component={component}/>
}

export default ProtectedRoute