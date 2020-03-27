const { initExpress, initDB, getApp } = require("./utils");
const { getSessionMiddleware } = require("./middlewares/session");
const { getAuthenticationMiddleware } = require("./middlewares/authentication");
const { getRequireBodyOnPost } = require("./middlewares/require-body-on-post");

initExpress();
initDB();

const app = getApp();
app.use(getSessionMiddleware(app));
app.use(getAuthenticationMiddleware());
app.use(getRequireBodyOnPost());

require("./controllers/room.controller");
require("./controllers/reservation.controller");
