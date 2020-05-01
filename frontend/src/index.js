/* eslint-disable react/no-children-prop */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker";
import { DigitProviders, DigitDialog } from "@cthit/react-digit-components";
import { Route } from "react-router";
import LinkITHeaderView from "./common/linkitheader.view";
import "./index.css";

ReactDOM.render(
    <DigitProviders
        children={
            <div className="main">
                <DigitDialog />
                <LinkITHeaderView
                    renderMain={() => <Route component={App} />}
                />
            </div>
        }
    />,
    document.getElementById("root")
);

serviceWorker.unregister();
