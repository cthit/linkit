import { getRequest, postRequest, deleteRequest } from "../common/api";

export const getUser = () => {
    return getRequest("/user/me");
};

export const getMyLinks = () => {
    return getRequest("/links/");
};

export const postLink = link => {
    return postRequest("/links/", link);
};

export const deleteLink = name => {
    return deleteRequest("/links/" + name);
};
