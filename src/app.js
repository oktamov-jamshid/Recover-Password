import express from "express";
import getConfig from "./common/config/config.service.js";
import userRouter from "./controller/user.controller.js";
import { create } from "express-handlebars";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import cookieParser from "cookie-parser";
import studentRouter from "./controller/student.controller.js";
import { sendEmail } from "./common/service/mail.service.js";
const app = express();

const PORT = getConfig("EXPRESS_PORT") || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hbs = create({
  extname: ".handlebars",
  defaultLayout: "main",
});

function initRoutes() {
  app.use("/user", userRouter);
  app.use("/student", studentRouter);
}
async function init() {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.json());
  app.engine("handlebars", hbs.engine);
  app.set("view engine", "handlebars");

  app.set("views", path.join(__dirname, "views"));

  initRoutes();

  app.listen(PORT, () => console.log(`Server ${PORT} da ishladi`));
}
init();
