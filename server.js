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
import fs from "fs/promises";

dotenv.config();

const app = express();

// dirname and path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  try {
    await generateSwaggerFile();

    // Load Swagger file
    const swaggerPath = join(__dirname, "api", "swagger", "swagger.json");
    let swaggerFile;
    try {
      swaggerFile = await fs.readFile(swaggerPath, "utf-8");
    } catch (err) {
      throw new Error(
        `Unable to load Swagger file at ${swaggerPath}: ${err.message}`
      );
    }

    // Serve Swagger JSON file statically
    app.use("/swagger.json", express.static(swaggerPath));

    // Middleware
    app.use(cors({ origin: "*" }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Routes
    app.use("/api", routes);

    // Swagger UI Setup
    app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(JSON.parse(swaggerFile))
    );

    // Database Connection
    try {
      await db.sequelize.authenticate();
      console.log("Database connected successfully!");
      await db.sequelize.sync({ force: false });
      console.log("Tables synchronized successfully!");
    } catch (dbError) {
      console.error("Error connecting to the database:", dbError.message);
    }

    // Server Setup
    const PORT = process.env.PORT_SERVER || 6001;
    startServer(app, PORT);
  } catch (error) {
    console.error("Server initialization failed:", error.message);
    process.exit(1);
  }
})();
