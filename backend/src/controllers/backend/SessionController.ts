import { Response, Express } from "express";
import { Repository } from "typeorm";
import { Link } from "../../entity/Links";
import { getRepository, addMissingHTTP } from "../../utils";
import { isNullOrUndefined } from "util";
import { Session } from "../../entity/Session";

let linkRepo: Repository<Link>;
let sessionRepo: Repository<Session>;

const handleGetYear = async (req: any, res: Response) => {
    const re = await sessionRepo.query(
        `SELECT series AS month, COALESCE(clicks, 0) AS clicks
        FROM generate_series((date_trunc('month', current_date) - INTERVAL '12 months')::date, current_date, '1 month'::interval) AS series
        LEFT JOIN
        (SELECT COUNT(id) as clicks, date_trunc('month', timestamp) as month
        FROM session
        WHERE timestamp > (current_date - INTERVAL '12 months')
        GROUP BY date_trunc('month', timestamp)) AS stats
        ON stats.month = series
        ORDER BY month`
    );

    res.status(200).send(re);
};

const handleGetMonth = async (req: any, res: Response) => {
    const re = await sessionRepo.query(
        `SELECT series AS date, COALESCE(clicks, 0) AS clicks
        FROM generate_series((date_trunc('day', current_date) - INTERVAL '1 months')::date, current_date, '1 day'::interval) AS series
        LEFT JOIN
        (SELECT COUNT(id) as clicks, date_trunc('day', timestamp) as date
        FROM session
        WHERE date_trunc('month', timestamp) = date_trunc('month', current_date)
        GROUP BY date_trunc('day', timestamp)) AS stats
        ON stats.date = series
        ORDER BY date`
    );

    res.status(200).send(re);
};

const handleGetAverageHour = async (req: any, res: Response) => {
    const re = await sessionRepo.query(
        `SELECT series AS hour, COALESCE(clicks, 0) AS clicks
        FROM generate_series(1, 24, 1) AS series
        LEFT JOIN
        (SELECT COUNT(id) as clicks, date_part('hour', timestamp) as hour
        FROM session
        GROUP BY date_part('hour', timestamp)) AS stats
        ON stats.hour = series
        ORDER BY hour`
    );

    res.status(200).send(re);
};

const handleGetCountries = async (req: any, res: Response) => {
    const re = await sessionRepo.query(
        `SELECT COUNT(id) as clicks, country
        FROM session
        GROUP BY country`
    );

    res.status(200).send(re);
};

const sessionController = (app: Express) => {
    linkRepo = getRepository(Link);
    sessionRepo = getRepository(Session);
    app.get("/api/links/:id/sessions/year", handleGetYear);
    app.get("/api/links/:id/sessions/month", handleGetMonth);
    app.get("/api/links/:id/sessions/averageHour", handleGetAverageHour);
    app.get("/api/links/:id/sessions/countries", handleGetCountries);
};

export default sessionController;
