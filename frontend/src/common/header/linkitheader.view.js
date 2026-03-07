import React from "react";
import { DigitGammaActions, useGamma } from "@cthit/react-digit-components";
import { useHistory } from "react-router-dom";
import { logOut } from "../../services/data.service";

const LinkITHeader = ({ isAdmin }) => {
    useGamma("/api/user/me", "/api/auth");
    const history = useHistory();
    return (
        <DigitGammaActions
            customOptionsOnClick={item =>
                item === "admin" ? history.push("/admin") : null
            }
            customOptions={{
                admin: "Admin",
            }}
            customOrder={
                isAdmin
                    ? ["admin", "viewAccount", "signOut"]
                    : ["viewAccount", "signOut"]
            }
            signOut={() => logOut()}
            size={{ width: "min-content" }}
            frontendUrl={
                process.env.NODE_ENV === "development"
                    ? "http://localhost:3000"
                    : "https://auth.chalmers.it"
            }
            backendUrl={
                process.env.NODE_ENV === "development"
                    ? "http://localhost:8081/api"
                    : "https://auth.chalmers.it"
            }
        />
    );
};

export default LinkITHeader;
