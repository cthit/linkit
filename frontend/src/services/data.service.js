import { getRequest } from "./api";

export const getMyLinks = () => {
    return getRequest("/links/");
};
