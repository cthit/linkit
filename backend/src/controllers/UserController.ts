import { Request, Response, Express } from "express";
import * as jf from "joiful";

const handleGetMe = async (req: any, res: Response, next: Function) => {
    const { nick, isAdmin } = req.session;
    res.status(200).send({ nick, isAdmin });
};

const UserController = (app: Express) => {
    app.get("/api/user/me", handleGetMe);
};

export default UserController;
