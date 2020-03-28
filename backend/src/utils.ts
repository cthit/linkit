import * as express from "express";
import { createServer } from "http";
//remove for: app.use(express.urlencoded({extended: true));
import * as bodyParser from "body-parser";
import * as cors from "cors";

import { Pool } from "pg";
var pool: Pool = null;

export const initExpress = (port: Number) => {
    const app = express();
    const server = createServer(app);

    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );
    app.use(cors());

    server.listen(port);

    return app;
};

//Add migration
//https://github.com/db-migrate/pg
export const initDB = (host = "db", port = 5432) => {
    pool = new Pool({
        user: "postgres",
        database: "bookit",
        password: "example",
        host: host,
        port: port,
    });

    return pool;
};

export function dbg<T>(x: T) {
    console.debug(x);
    return x;
}

export const query = (
    sql: string,
    values: any,
    convertResult: (value: any) => void
) =>
    new Promise((resolve, reject) => {
        pool.query(sql, values, (errors, results) => {
            if (errors) {
                reject(errors);
            } else {
                resolve(convertResult(results));
            }
        });
    });

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

export const renameProp = (
    oldProp: any,
    newProp: any,
    { [oldProp]: old, ...others }
) => ({
    [newProp]: old,
    ...others,
});
