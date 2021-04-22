import { Router } from "express";
import { MessagesControllers } from "./controllers/MessagesController";
import { SettingsControllers } from "./controllers/SettingsControllers";
import { UsersControllers } from "./controllers/UsersControllers";

const routes = Router();

const settingsControllers = new SettingsControllers();
const userControllers = new UsersControllers();
const messageControllers = new MessagesControllers();

routes.post("/settings", settingsControllers.create);
routes.post("/users", userControllers.create);
routes.post("/messages", messageControllers.create);
routes.get("/showByUsers/:id", messageControllers.showByUser);

export { routes };