import express from "express";
import { createServer } from "http";
import { createConnection, Connection, ObjectType } from "typeorm";
import bodyParser from "body-parser";
import * as path from "path";

let conn: Connection = null;

export const initExpress = (port: number = 4000) => {
    const app = express();
    const server = createServer(app);

    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );

    server.listen(port);

    return app;
};

export const initDB = async (host: string = "db", port: number = 5432) => {
    const __dirname = path.resolve();
    conn = await createConnection({
        type: "postgres",
        host: "db",
        port: 5432,
        username: "postgres",
        password: "example",
        database: "linkit",
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
    return url.match(/^[a-zA-Z]+:\/\//) ? url : "https://" + url;
};

export const renameProp = (
    oldProp: any,
    newProp: any,
    { [oldProp]: old, ...others }
) => ({
    [newProp]: old,
    ...others,
});
