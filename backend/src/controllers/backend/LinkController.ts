import { Response, Express } from "express";
import * as jf from "joiful";
import { getRepository, dbg, addMissingHTTP } from "../../utils";
import { Link } from "../../entity/Links";
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

const handleDeleteLinks = async (req: any, res: Response) => {
    let link = await linkRepo.findOne({ shortcut: req.params.id });
    if (!link) {
        res.status(400).send("link doesn't exist");
        return;
    }
    let isOwner = req.session.cid == link.creatorUID;
    if (!req.session.isAdmin && !isOwner) {
        res.status(403).send("Not admin or owner of this link");
        return;
    }
    await linkRepo.delete(link);
    res.sendStatus(200);
};

const handleGetAllLinks = async (req: any, res: Response) => {
    if (!req.session.isAdmin) {
        res.status(403).send("Only admins allowed");
        return;
    }
    let links = await linkRepo.find();
    res.status(200).send(links);
};

const handleGetLinks = async (req: any, res: Response) => {
    let links = await linkRepo.find({ creatorUID: req.session.cid });
    res.status(200).send(
        links.map(link => ({
            shortcut: link.shortcut,
            linkurl: link.linkurl,
        }))
    );
};

const handleAddLink = async (req: any, res: Response) => {
    const { value, error } = jf.validateAsClass(req.body, AddLinkBody);
    if (error) {
        res.status(400).send("Invalid body");
        return;
    }
    let exists = await linkRepo.findOne({ shortcut: value.shortcut });

    // If a link with that id already exists and user is not the owner
    if (exists && exists.creatorUID != req.session.cid) {
        res.status(400).send(
            "Shortcut already exists and is owned by someone else"
        );
        return;
    }

    let newLink = new Link();

    newLink.linkurl = addMissingHTTP(value.linkurl);
    newLink.shortcut = value.shortcut;
    newLink.creatorUID = req.session.cid;

    await linkRepo.save(newLink);
    res.status(200).send(newLink);
};

const linkController = (app: Express) => {
    linkRepo = getRepository(Link);
    app.get("/api/links/", handleGetLinks);
    app.get("/api/link/all", handleGetAllLinks);
    app.post("/api/links/", handleAddLink);
    app.delete("/api/links/:id", handleAddLink);
};

export default linkController;
