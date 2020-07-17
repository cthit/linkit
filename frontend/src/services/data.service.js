import { getRequest, postRequest, deleteRequest } from "../common/api";

export const getUser = () => {
    return getRequest("/user/me");
};

export const getMyLinks = () => {
    return getRequest("/links/");
};

export const getAllLinks = () => {
    return getRequest("/links/all");
};

export const postLink = link => {
    return postRequest("/links/", link);
};

export const deleteLink = name => {
    return deleteRequest("/links/" + name);
};

export const getYearSessions = link => {
    return getRequest("/links/" + link + "/sessions/year");
};

export const getMonthSessions = link => {
    return getRequest("/links/" + link + "/sessions/month");
};

export const getAvgHourSessions = link => {
    return getRequest("/links/" + link + "/sessions/averagehour");
};

export const getCountrySessions = link => {
    return getRequest("/links/" + link + "/sessions/countries");
};
