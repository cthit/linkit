import { Response, Express } from "express";
import { Repository } from "typeorm";
import { Link } from "../../entity/Links";
import { getRepository, addMissingHTTP } from "../../utils";
import { isNullOrUndefined } from "util";

let linkRepo: Repository<Link> = null;
let redirectURL: string = null;

const handleRedirectShortcut = async (req: any, res: Response) => {
    let link = await linkRepo.findOne({ shortcut: req.params.id });

    if (isNullOrUndefined(link)) {
        res.sendStatus(404);
        return;
    }
    res.redirect(302, link.linkurl.toString());
};

const handleRedirectHome = async (req: any, res: Response) => {
    // 307 disables cache for browser
    res.redirect(307, redirectURL);
};

const publicController = (app: Express) => {
    redirectURL = addMissingHTTP(process.env.REDIRECT_URL).toString();

    linkRepo = getRepository(Link);
    app.get("/", handleRedirectHome);
    app.get("/:id", handleRedirectShortcut);
};

export default publicController;
