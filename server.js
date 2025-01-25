import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import db from "./api/models/index.js";
import routes from "./api/routes/index.js";
import startServer from "./api/ServerSetup/ServerSetup.js";
import {
  generateSwaggerFile,
  loadSwaggerFile,
} from "./api/config/swaggerconfig.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
dotenv.config();
const app = express();

// dirname and path :-
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  await generateSwaggerFile();
  const swaggerFile = await loadSwaggerFile();
  // Static-path:-
  app.use(
    "/swagger.json",
    express.static(join(__dirname, "api", "swagger", "swagger.json"))
  );

  // Middlewares:-
  //cors:-
  app.use(cors({ origin: "*" }));
  // Body-parser:-
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  // Routes:-
  app.use("/api", routes);
  // Swagger docs:-
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(null, { swaggerUrl: "/swagger.json" })
  );

  // Database Connection:-
  try {
    await db.sequelize.authenticate();
    console.log("Database connected successfully!");
    await db.sequelize.sync({ force: false });
    console.log("Tables created successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }

  // Server Setup:-
  const PORT = process.env.PORT_SERVER || 6001;
  startServer(app, PORT);
})();
