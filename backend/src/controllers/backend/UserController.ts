import { Request, Response, Express } from "express";
import { getMe } from "../../utils/gamma";

const handleGetMe = async (req: any, res: Response) => {
    const me = (await getMe(req.session.token)).data;
    res.status(200).send({ ...me, isAdmin: req.session.isAdmin });
};

const userController = (app: Express) => {
    app.get("/api/me", handleGetMe);
};

export default userController;
