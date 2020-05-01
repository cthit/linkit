import axios from "axios";
import _ from "lodash";

const transport = axios.create({
    withCredentials: true,
});

function removeLastSlash(path) {
    return _.trimEnd(path, "/");
}

const path =
    process.env.NODE_ENV === "development"
        ? "http://localhost:4000/api"
        : "https://linkit.chalmers.it/api";

export function postRequest(endpoint, data) {
    var headers = {};

    // if (includeAuthorization) {
    //   headers = {
    //     Authorization: "Bearer " + token()
    //   };
    // }

    return transport.post(removeLastSlash(path + endpoint), data, {
        headers,
    });
}

export function deleteRequest(endpoint, data) {
    var headers = {};

    // if (includeAuthorization) {
    //   headers = {
    //     Authorization: "Bearer " + token()
    //   };
    // }

    return transport.delete(removeLastSlash(path + endpoint), {
        data: data,
        headers,
    });
}

export function getRequest(endpoint) {
    var headers = {};

    // if (includeAuthorization) {
    //   headers = {
    //     Authorization: "Bearer " + token()
    //   };
    // }

    return new Promise((resolve, reject) => {
        transport
            .get(removeLastSlash(path + endpoint), {
                headers,
            })
            .then(response => resolve(response))
            .catch(error => {
                if (error.response != null) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    if (error.response.status === 401) {
                        window.location.href = error.response.data;
                    }
                } else {
                    console.log(error);
                }
                reject(error);
            });
    });
}
