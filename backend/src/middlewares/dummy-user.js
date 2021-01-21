export const getDummyUserMiddleware = () => (req, res, next) => {
    req.session.uid = "1";
    req.session.cid = "admin";
    req.session.nick = "Admin";
    req.session.isAdmin = true;
    req.session.save(err => console.log(err));

    next();
};
