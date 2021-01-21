import jwt from "jsonwebtoken";
import { to, dbg } from "../utils";
import { getGammaUri, postGammaToken, getMe } from "../utils/gamma";

export const getAuthenticationMiddleware = () => {
    return async (req, res, next) => {
        //user signed in, continue...
        if (req.session.token) {
            console.log("yay signed in: " + req.session.nick);
            next();
        } else {
            //If user is trying to create session
            const { code } = req.body;
            if (
                req.path === "/api/auth" &&
                req.method === "POST" &&
                code != null
            ) {
                const [err, response] = await to(postGammaToken(code));
                if (err) {
                    if (err.response && err.response.status === 401) {
                        res.status(401).send(
                            "code either outdated or incorrect"
                        );
                        console.log(err.response);
                    } else {
                        res.status(500);
                        console.log(err);
                    }
                } else {
                    console.debug(response.data);
                    const { access_token, expires_in } = response.data;
                    //Todo set the maxAge to something that expires_in.
                    //req.session.cookie.maxAge = expires_in;

                    req.session.token = access_token;

                    payload = jwt.decode(access_token);

                    const admins = process.env.ADMINS.split(",");
                    req.session.isAdmin = admins.includes(payload.user_name);
                    req.session.cid = payload.user_name;

                    req.session.save(err => console.log(err));
                    res.status(200).send("session created");
                }
            } else {
                res.status(401).send(getGammaUri());
            }
        }
    };
};
