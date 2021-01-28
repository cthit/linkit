import React, { useState, useEffect } from "react";
import { Switch } from "react-router-dom";
import { Route } from "react-router";
import Admin from "./use-cases/admin";
import Home from "./use-cases/home/home";
import NotFound from "./use-cases/notfound";
import NotAllowed from "./use-cases/notallowed";
import "./App.css";
import {
    useGamma,
    useGammaMe,
    DigitHeader,
} from "@cthit/react-digit-components";
import LinkITHeaderView from "./common/header/";

const App = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    useGamma("/api/user/me", "/api/auth");

    const me = useGammaMe();

    useEffect(() => {
        if (me) {
            setIsAdmin(!!me.isAdmin);
        }
    }, [me]);

    return (
        <DigitHeader
            title="LinkIT🔗"
            headerRowProps={{
                flex: "1",
                justifyContent: "space-between",
            }}
            renderHeader={() => {
                return <LinkITHeaderView />;
            }}
            renderMain={() => (
                <>
                    <Switch>
                        <Route
                            path="/admin"
                            component={isAdmin ? Admin : NotAllowed}
                        />
                        <Route exact path="/" component={Home} />
                        <Route path="/" component={NotFound} />
                    </Switch>
                </>
            )}
        />
    );
};

export default App;
