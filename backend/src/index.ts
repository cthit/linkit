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

const corsOptions = {
    origin: "http://localhost:3001",
    credentials: true,
};

const main = async () => {
    const backend = initExpress(4000);
    await initDB();

    backend.use(getSessionMiddleware(backend));
    backend.use(getAuthenticationMiddleware());
    // backend.use(getDummyUserMiddleware());
    backend.use(getRequireBodyOnPost());
    backend.use(cors(corsOptions));

    linkController(backend);
    userController(backend);

    const publicApp = initExpress(4001);
    publicController(publicApp);
};

main();
