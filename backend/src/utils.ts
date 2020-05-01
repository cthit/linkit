import * as express from "express";
import { createServer } from "http";
import { createConnection, Connection, ObjectType } from "typeorm";
import * as bodyParser from "body-parser";
import * as cors from "cors";

let conn: Connection = null;

const corsOptions = {
    origin: "http://localhost:3001",
    credentials: true,
};

export const initExpress = (port: number = 4000) => {
    const app = express();
    const server = createServer(app);

    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );
    app.use(cors(corsOptions));

    server.listen(port);

    return app;
};

export const initDB = async (host: string = "db", port: number = 5432) => {
    conn = await createConnection({
        type: "postgres",
        host: "db",
        port: 5432,
        username: "postgres",
        password: "example",
        database: "bookit",
        entities: [__dirname + "/entity/**/*.ts"],
        synchronize: true,
        logging: false,
    });
};

export const getRepository = <Entity>(rep: ObjectType<Entity>) => {
    if (conn) {
        return conn.getRepository(rep);
    }
    throw new Error("DB not initialized properly");
};

export function dbg<T>(x: T) {
    console.debug(x);
    return x;
}

export const to = <T>(promise: Promise<T>) => {
    return promise
        .then(data => {
            return [null, data];
        })
        .catch(err => [err]);
};

export const v4UUIDPattern = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
);

export const isUUID = (uuid: string) => uuid.match(v4UUIDPattern);

export const addMissingHTTP = (url: string) => {
    return url.match(/^[a-zA-Z]+:\/\//) ? url : "http://" + url;
};

export const renameProp = (
    oldProp: any,
    newProp: any,
    { [oldProp]: old, ...others }
) => ({
    [newProp]: old,
    ...others,
});
