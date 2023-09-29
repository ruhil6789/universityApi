import express, { Application } from "express"
import { Server } from "http"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import cors from "cors"
import path from "path"
import DBClass from "./config/db.config"
import errorHandler from "./responses"
const app = express()

export default class ExpressServer {
    private routes: (app: Application) => void

    constructor() {
        const root = path.normalize(__dirname + "/..");

        //  db connection
        DBClass.dbCOnnection()

        app.use(cors())
        app.use(express.json())
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({
            extended: false
        }))
        app.use(express.urlencoded());

    }
    router(routes: (app: Application) => void): ExpressServer {
        routes(app);
        app.use(errorHandler);
        return this;
    }

    listen(port: number): Server {
        const instance: Server = app.listen(port, () => {
            console.log(`App listening on the port ${port}`);
        });
        return instance;

    }
}