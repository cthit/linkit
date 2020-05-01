import axios from "axios";
import _ from "lodash";

function removeLastSlash(s) {
    return s.replace(/\/$/, "");
}

const path =
    process.env.NODE_ENV === "development"
        ? "http://localhost:4000/api"
        : "https://linkit.chalmers.it/api";

export function getRequest(endpoint) {
    var headers = {};

    // if (includeAuthorization) {
    //   headers = {
    //     Authorization: "Bearer " + token()
    //   };
    // }

    return new Promise((resolve, reject) => {
        axios
            .get(removeLastSlash(path + endpoint), {
                headers,
            })
            .then(response => resolve(response))
            .catch(error => {
                if (error.response != null) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    if (error.response.status === 403) {
                        window.location.href = error.response.data;
                    }
                } else {
                    console.log(error);
                }
                reject(error);
            });
    });
}
