import { Request, Response, Express } from "express";
import * as jf from "joiful";
import { getRepository, dbg } from "../utils";
import { Link } from "../entity/Links";
import { Repository } from "typeorm";

const validShortcut = () =>
    jf
        .string()
        .max(20)
        .regex(/[A-Za-z0-9-_]+/)
        .required();

const validLink = () =>
    jf
        .string()
        .regex(
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        )
        .required();

let linkRepo: Repository<Link> = null;
class AddLinkBody {
    @validShortcut()
    shortcut: string;
    @validLink()
    linkurl: string;
}

const handleGetLink = async (req: Request, res: Response, next: Function) => {
    // Do stuff
    res.status(200).send({ test: "test" });
};

const handleAddLink = async (req: any, res: Response, next: Function) => {
    const { value, error } = jf.validateAsClass(req.body, AddLinkBody);
    if (error) {
        res.status(400).send("Invalid body");
        return;
    }

    if (dbg(await linkRepo.findOne({ shortcut: value.shortcut }))) {
        res.status(400).send("Shortcut already exists");
        return;
    }

    let newLink = new Link();

    // Add http to link if not present
    const httpLink = value.linkurl.match(/^[a-zA-Z]+:\/\//)
        ? value.linkurl
        : "http://" + value.linkurl;

    newLink.linkurl = httpLink;
    newLink.shortcut = value.shortcut;
    newLink.creatorUID = req.session.cid;

    await linkRepo.save(newLink);
    res.status(200).send(newLink);
};

const linkController = (app: Express) => {
    linkRepo = getRepository(Link);
    app.get("/api/link/:id", handleGetLink);
    app.post("/api/link/", handleAddLink);
};

export default linkController;
