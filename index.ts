import cronHandler from "./cron.handler"
import routes from "./routes"
import Server from "./server"

const PORT = 9003
cronHandler.cronHandler()

export default new Server().router(routes).listen(PORT)
