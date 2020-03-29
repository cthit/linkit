import { initExpress, initDB } from "./utils";
import linkController from "./controllers/LinkController";
import userController from "./controllers/UserController";
import "reflect-metadata";
import { Link } from "./entity/Links";
const { getSessionMiddleware } = require("./middlewares/session");
const { getAuthenticationMiddleware } = require("./middlewares/authentication");
const { getRequireBodyOnPost } = require("./middlewares/require-body-on-post");

const main = async () => {
    const app = initExpress(4000);
    const conn = await initDB();

    // test db

    let testLink = new Link();
    testLink.linkurl = "google.se";
    testLink.shortcut = "test2";
    testLink.creatorUID = "test123";

    await conn.manager.save(testLink);

    app.use(getSessionMiddleware(app));
    app.use(getAuthenticationMiddleware());
    app.use(getRequireBodyOnPost());

    linkController(app);
    userController(app);
};

main();
