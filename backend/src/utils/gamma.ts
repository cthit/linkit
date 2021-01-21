import axios from "axios";

const gammaSettings = {
    clientId: process.env.GAMMA_CLIENT_ID,
    clientSecret: process.env.GAMMA_CLIENT_SECRET,
    tokenUri: process.env.GAMMA_TOKEN,
    authorizationUri: process.env.GAMMA_AUTH,
    redirectUri: process.env.GAMMA_REDIRECT,
    meUri: process.env.GAMMA_ME,
};

export const getGammaUri = () => {
    const responseType = "response_type=code";
    const clientId = "client_id=" + gammaSettings.clientId;
    const redirectUri = "redirect_uri=" + gammaSettings.redirectUri;
    return (
        gammaSettings.authorizationUri +
        "?" +
        responseType +
        "&" +
        clientId +
        "&" +
        redirectUri
    );
};

export async function getMe(token: any) {
    return axios.get(gammaSettings.meUri, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}

export async function postGammaToken(code: any) {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id", gammaSettings.clientId);
    params.append("redirect_uri", gammaSettings.redirectUri);
    params.append("code", code);

    const c = Buffer.from(
        gammaSettings.clientId + ":" + gammaSettings.clientSecret
    ).toString("base64");

    return axios.post(gammaSettings.tokenUri + "?" + params.toString(), null, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + c,
        },
    });
}
