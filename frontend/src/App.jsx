import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Route } from "react-router";
import Callback from "./use-cases/callback";
import Admin from "./use-cases/admin";
import Home from "./use-cases/home/home";
import NotFound from "./use-cases/notfound";
import { getUser } from "./services/data.service";
import "./App.css";

const App = () => {
    // Terrible terrible why oh why
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        getUser().then(user => {
            setIsAdmin(user.data.isAdmin);
        });
    }, []);
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/auth/account/callback" component={Callback} />
                <Route path="/admin" component={isAdmin ? Admin : NotFound} />
                <Route path="/" component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
