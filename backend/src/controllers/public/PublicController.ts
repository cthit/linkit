import { Response, Express } from "express";
import { Repository } from "typeorm";
import { Link } from "../../entity/Links";
import { getRepository, addMissingHTTP } from "../../utils";

let linkRepo: Repository<Link> = null;
let redirectURL: string = null;

const handleRedirectShortcut = async (req: any, res: Response) => {
    let link = await linkRepo.findOne({ shortcut: req.params.id });

    if (!link) {
        res.sendStatus(404);
    }
    res.redirect(301, link.linkurl.toString());
};

const handleRedirectHome = async (req: any, res: Response) => {
    res.redirect(301, redirectURL);
};

const publicController = (app: Express) => {
    redirectURL = addMissingHTTP(process.env.REDIRECT_URL).toString();

    linkRepo = getRepository(Link);
    app.get("/", handleRedirectHome);
    app.get("/:id", handleRedirectShortcut);
};

export default publicController;
