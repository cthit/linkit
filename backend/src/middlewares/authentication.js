const jwt = require("jsonwebtoken");
const { to, dbg } = require("../utils");
const { getGammaUri, postGammaToken } = require("../utils/gamma");

const getAuthenticationMiddleware = () => {
    return async (req, res, next) => {
        //user signed in, continue...
        if (req.session.uid) {
            console.log("yay signed in: " + req.session.nick);
            next();
        } else {
            //If user is trying to create session
            const { code } = req.body;
            if (
                req.path === "/api/auth/account/callback" &&
                req.method === "POST" &&
                code != null
            ) {
                const [err, response] = await to(postGammaToken(code));
                if (err) {
                    if (err.response && err.response.status === 400) {
                        res.status(400).send(
                            "code either outdated or incorrect"
                        );
                        console.log(err.response);
                    } else {
                        res.status(500);
                        console.log(err);
                    }
                } else {
                    const { access_token, expires_in } = response.data;
                    //Todo set the maxAge to something that expires_in.
                    //req.session.cookie.maxAge = expires_in;
                    payload = jwt.decode(access_token);
                    if (process.env.ADMINS) {
                        const admins = dbg(process.env.ADMINS.split(","));
                        req.session.isAdmin = admins.includes(
                            payload.user_name
                        );
                    } else {
                        req.session.isAdmin = false;
                    }

                    req.session.uid = payload.uid;
                    req.session.cid = payload.user_name;
                    req.session.nick = payload.nick;

                    req.session.save(err => console.log(err));
                    res.status(200).send("session created");
                }
            } else {
                res.status(403).send(getGammaUri());
            }
        }
    };
};

module.exports = {
    getAuthenticationMiddleware,
};
