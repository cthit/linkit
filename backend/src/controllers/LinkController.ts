import { Request, Response, Express } from "express";

const handleController = async (req: Request, res: Response) => {
    // Do stuff
    res.status(200).send({ test: "test" });
};

const LinkController = (app: Express) => {
    app.get("/api/link", handleController);
};

export default LinkController;
