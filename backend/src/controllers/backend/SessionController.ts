import { Response, Express } from "express";
import { Repository } from "typeorm";
import { Link } from "../../entity/Links";
import { getRepository, addMissingHTTP } from "../../utils";
import { isNullOrUndefined } from "util";
import { Session } from "../../entity/Session";

let linkRepo: Repository<Link>;
let sessionRepo: Repository<Session>;

const handleRedirectShortcut = async (req: any, res: Response) => {
    const link = await linkRepo.findOne({ shortcut: req.params.id });

    if (isNullOrUndefined(link)) {
        res.sendStatus(404);
        return;
    }
    res.redirect(302, link.linkurl.toString());

    const session = new Session();

    session.ip = req.ip;
    session.link = link;
    // Default to Sweden if cloudflare doesn't work
    session.country = req.header("cf-country")
        ? req.header("cf-country")
        : "SE";

    sessionRepo.save(session);
};

const publicController = (app: Express) => {
    linkRepo = getRepository(Link);
    sessionRepo = getRepository(Session);
    app.get("/:id", handleRedirectShortcut);
};

export default publicController;
