import { Request, Response, Express } from "express";

const handleGetMe = async (req: any, res: Response) => {
    const { nick, isAdmin, cid } = req.session;
    res.status(200).send({ nick, isAdmin, cid });
};

const userController = (app: Express) => {
    app.get("/api/user/me", handleGetMe);
};

export default userController;
