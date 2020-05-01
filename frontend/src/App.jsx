import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Route } from "react-router";

import Home from "./use-cases/home/home";
//import NotFound from "./use-cases/notfound";
//import Callback from "./use-cases/callback";
import "./App.css";

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            {
                //<Route path="/callback" component={Callback} />
                //<Route path="/" component={NotFound} />
            }
        </Switch>
    </BrowserRouter>
);

export default App;
