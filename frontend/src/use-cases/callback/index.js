import React, { useEffect } from "react";
import { postRequest } from "../../common/api";
import { useHistory } from "react-router-dom";

const Callback = ({ location }) => {
    const history = useHistory();
    useEffect(() => {
        let params = new URLSearchParams(location.search);
        const code = params.get("code");
        if (code) {
            postRequest("/auth/account/callback", { code })
                .then(() => {
                    history.push("/");
                })
                .catch(error => {
                    history.push("/");
                    console.log("Someting went wrong");
                    console.log(error);
                });
        }
    }, [location.search]);

    return <div />;
};

export default Callback;
