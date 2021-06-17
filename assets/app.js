import React, {useState} from "react";
import ReactDOM from "react-dom";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import AuthAPI from "./services/AuthAPI";
import AuthContext from "./Datashare/AuthContext"
import HomeComponent from "./components/Home/HomeComponent";
import LoginComponent from "./components/Login/LoginComponent";


AuthAPI.setUpAuth();


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());

    return (
        <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated}}>
            <HashRouter>
                <Switch>
                    <Route path="/home"
                           render={(props) => isAuthenticated ? <HomeComponent {...props} /> :
                               <Redirect to="/"/>}/>
                    <Route path="/" render={(props) => <LoginComponent  {...props}/>}/>
                </Switch>
            </HashRouter>
        </AuthContext.Provider>
    );
};

ReactDOM.render(<App/>, document.getElementById("root"));
