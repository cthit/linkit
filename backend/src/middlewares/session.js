import Redis from "ioredis";
import connectRedis from "connect-redis";
import session from "express-session";
const RedisStore = connectRedis(session);

//Do I need to fix a password?
const redisClient = new Redis("redis://redis:6379");

//TODO review settings
var sess = {
    name: "linkit-session",
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

export const getSessionMiddleware = app => {
    app.set("trust proxy", 1);
    if (app.get("env") === "production") {
        app.set("trust proxy", 1);
        sess.cookie.httpOnly = true;
        sess.cookie.sameSite = true;
    }

    return session(sess);
};
