import express, { Application } from "express";
import commonRouter from "./controller/common/commonRouter";
import courseController from "./controller/common/courseController";


export default function routes(app:Application):void{
    app.use("/",commonRouter)
    // app.use("/",courseController)
}