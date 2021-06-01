import React, {useState} from "react";
import ReactDOM from "react-dom";
import {HashRouter, Route, Switch} from "react-router-dom";
import Login from "./pages/login";
import AuthAPI from "./services/AuthAPI";
import Home from "./pages/Home";


AuthAPI.setUpAuth();

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());

    return (
        <HashRouter>
            <Switch>
                <Route path="/home" render={(props) => <Home {...props}/>}/>
                <Route path="/" render={(props) => <Login onLogIn={setIsAuthenticated} {...props}/>}/>
            </Switch>
        </HashRouter>
    );
};

ReactDOM.render(<App/>, document.getElementById("root"));
