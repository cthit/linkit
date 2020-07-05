/* eslint-disable react/no-children-prop */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker";
import { DigitProviders } from "@cthit/react-digit-components";
import "./index.css";

ReactDOM.render(
    <DigitProviders children={<App />} />,
    document.getElementById("root")
);

serviceWorker.unregister();
