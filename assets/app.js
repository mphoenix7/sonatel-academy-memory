import React, {useState} from "react";
import ReactDOM from "react-dom";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import AuthAPI from "./services/AuthAPI";
import Home from "./pages/Home/HomePage";
import AuthContext from "./Datashare/AuthContext"
import HomePage from "./pages/Home/HomePage";


AuthAPI.setUpAuth();


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());

    return (
        <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated}}>
            <HashRouter>
                <Switch>
                    <Route path="/home"
                           render={(props) => isAuthenticated ? <HomePage {...props} /> :
                               <Redirect to="/"/>}/>
                    <Route path="/" render={(props) => <LoginPage  {...props}/>}/>
                </Switch>
            </HashRouter>
        </AuthContext.Provider>
    );
};

ReactDOM.render(<App/>, document.getElementById("root"));
