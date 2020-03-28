import { initExpress, initDB } from "./utils";
import LinkController from "./controllers/LinkController";
const { getSessionMiddleware } = require("./middlewares/session");
const { getAuthenticationMiddleware } = require("./middlewares/authentication");
const { getRequireBodyOnPost } = require("./middlewares/require-body-on-post");

initDB();

const app = initExpress(4000);
app.use(getSessionMiddleware(app));
app.use(getAuthenticationMiddleware());
app.use(getRequireBodyOnPost());

LinkController(app);
