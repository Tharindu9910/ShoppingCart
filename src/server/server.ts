import express from "express";
import config from "./config";
import apiRouter from "./api-router";

const server = express();
server.use(express.static("dist"));
server.set("view engine", "ejs");
server.use("/api", apiRouter);


server.get(["/"], async (req, res) => {
    // const {initialData} = await serverRender(req);
    // res.render("index", {initialData});
    res.render("index");
});


server.listen(config.PORT, () => {
    console.log(`Express server is listening at ${config.SERVER_URL}`);
});
