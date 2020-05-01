import { getRequest, postRequest, deleteRequest } from "./api";

export const getMyLinks = () => {
    return getRequest("/links/");
};

export const postLink = link => {
    return postRequest("/links/", link);
};

export const deleteLink = name => {
    return deleteRequest("/links/" + name);
};
