import express from "express";
import {buildRoutes} from "./routes";

console.log("hello")

const app = express();

buildRoutes(app);

const port = process.env.PORT || 3000;

app.listen(port,function(){
    console.log(`Listening on ${port}...`);
})