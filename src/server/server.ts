import express from "express";
import config from "./config";
import apiRouter from "./api-router";
import serverRender from "./render";

const server = express();
server.use(express.static("dist"));
server.set("view engine", "ejs");
server.use("/api", apiRouter);


server.get(["/"], async (req, res) => {
    const {initialMarkup,initialData} = await serverRender(req);
    res.render("index", {initialMarkup,initialData});
});


server.listen(config.PORT, () => {
    console.log(`Express server is listening at ${config.SERVER_URL}`);
});
