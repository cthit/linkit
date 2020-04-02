import { initExpress, initDB } from "./utils";
import linkController from "./controllers/LinkController";
import userController from "./controllers/UserController";
import "reflect-metadata";
const { getSessionMiddleware } = require("./middlewares/session");
const { getAuthenticationMiddleware } = require("./middlewares/authentication");
const { getRequireBodyOnPost } = require("./middlewares/require-body-on-post");

const main = async () => {
    const app = initExpress(4000);
    await initDB();

    app.use(getSessionMiddleware(app));
    app.use(getAuthenticationMiddleware());
    app.use(getRequireBodyOnPost());

    linkController(app);
    userController(app);
};

main();
