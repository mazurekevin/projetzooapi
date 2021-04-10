import {Express} from "express";
import zooRouter from './zoo';

export function buildRoutes(app: Express){
    app.use("/zoo", zooRouter);
}