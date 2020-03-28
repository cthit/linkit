import { Request, Response, Express } from "express";
import * as jf from "joiful";

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
class AddLinkBody {
    @validShortcut()
    shortcut: string;
    @validLink()
    linked: string;
}

const handleGetLink = async (req: Request, res: Response, next: Function) => {
    // Do stuff
    res.status(200).send({ test: "test" });
};

const handleAddLink = async (req: Request, res: Response, next: Function) => {
    const { value, error } = jf.validateAsClass(req.body, AddLinkBody);
    if (error) {
        res.status(400).send("Invalid body");
    }
    res.sendStatus(200);
};

const LinkController = (app: Express) => {
    app.get("/api/link/:id", handleGetLink);
    app.post("/api/link/", handleAddLink);
};

export default LinkController;
