import express from "express";
const app = express();
const port = 3001;

app.get("/", (req, res) => res.redirect(301, "https://google.se"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
