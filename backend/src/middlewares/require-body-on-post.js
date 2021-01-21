export const getRequireBodyOnPost = () => (req, res, next) => {
    if (req.method === "POST" && req.body == null) {
        res.status(400).send("body is null");
    } else {
        next();
    }
};
