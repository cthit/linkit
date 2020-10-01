import { initExpress, initDB } from "./utils";
import linkController from "./controllers/backend/LinkController";
import userController from "./controllers/backend/UserController";
import publicController from "./controllers/public/PublicController";
import { getSessionMiddleware } from "./middlewares/session";
import { getAuthenticationMiddleware } from "./middlewares/authentication";
import { getDummyUserMiddleware } from "./middlewares/dummy-user";
import { getRequireBodyOnPost } from "./middlewares/require-body-on-post";
import "reflect-metadata";
import * as cors from "cors";
import sessionController from "./controllers/backend/SessionController";

const corsOptions = {
    origin: process.env.NODE_ENV !== "production" ? "*" : "",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
};

const main = async () => {
    const backend = initExpress(4000);
    await initDB();

    // enabled cors
    backend.use(cors(corsOptions));
    // preflight cors
    backend.options("*", cors(corsOptions)); // include before other routes

    backend.use(getSessionMiddleware(backend));
    backend.use(getAuthenticationMiddleware());
    // backend.use(getDummyUserMiddleware());
    backend.use(getRequireBodyOnPost());

    linkController(backend);
    userController(backend);
    sessionController(backend);

    //const publicApp = initExpress(4001);
    //publicController(publicApp);
};

main();
