/* eslint-disable react/no-children-prop */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker";
import { DigitProviders, DigitDialog } from "@cthit/react-digit-components";
import { Route } from "react-router";
import "./index.css";

ReactDOM.render(
    <DigitProviders children={<App />} />,
    document.getElementById("root")
);

serviceWorker.unregister();
