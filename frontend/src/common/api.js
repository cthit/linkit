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

export const getRequest = endpoint => {
    var headers = {};
    return transport.get(removeLastSlash(path + endpoint), {
        headers,
    });
};
