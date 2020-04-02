import { initExpress, initDB } from "./utils";
import linkController from "./controllers/backend/LinkController";
import userController from "./controllers/backend/UserController";
import "reflect-metadata";
import publicController from "./controllers/public/PublicController";
import { getSessionMiddleware } from "./middlewares/session";
import { getAuthenticationMiddleware } from "./middlewares/authentication";
import { getRequireBodyOnPost } from "./middlewares/require-body-on-post";

const main = async () => {
    const backend = initExpress(4000);
    await initDB();

    backend.use(getSessionMiddleware(backend));
    backend.use(getAuthenticationMiddleware());
    backend.use(getRequireBodyOnPost());

    linkController(backend);
    userController(backend);

    const publicApp = initExpress(4001);
    publicController(publicApp);
};

main();
