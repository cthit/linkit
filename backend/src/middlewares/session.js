const Redis = require("ioredis");
const session = require("express-session");

let RedisStore = require("connect-redis")(session);

//Do I need to fix a password?
const redisClient = new Redis("redis://redis:6379");

//TODO review settings
var sess = {
    name: "bookit-session",
    store: new RedisStore({ client: redisClient }),
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        sameSite: false,
        secure: process.env.NODE_ENV === "production",
    },
};

const getSessionMiddleware = app => {
    app.set("trust proxy", 1);
    if (app.get("env") === "production") {
        app.set("trust proxy", 1);
        sess.cookie.httpOnly = true;
        sess.cookie.sameSite = true;
    }

    return session(sess);
};

module.exports = {
    getSessionMiddleware,
};
