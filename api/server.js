import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import db from "../api/models/index.js";
import routes from "../api/routes/index.js";
import startServer from "../api/ServerSetup/ServerSetup.js";
import { generateSwaggerFile } from "../api/config/swaggerconfig.js";
import { fileURLToPath } from "url";
import path, { dirname, join } from "path";
import fs from "fs/promises";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

async function initializeServer() {
  try {
    await generateSwaggerFile();

    const swaggerPath = join(__dirname, "swagger", "swagger.json");
    let swaggerFile;
    try {
      swaggerFile = await fs.readFile(swaggerPath, "utf-8");
    } catch (err) {
      throw new Error(`Unable to load Swagger file: ${err.message}`);
    }
    app.use("/swagger.json", express.static(swaggerPath));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use("/api", routes);

    app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(JSON.parse(swaggerFile))
    );

    try {
      await db.sequelize.authenticate();
      console.log("Database connected successfully!");
      await db.sequelize.sync({ force: false });
      console.log("Tables synchronized successfully!");
    } catch (dbError) {
      console.error("Database connection error:", dbError.message);
    }

    //Give access to img by giving static path:-
    const imagesPath = path.join(process.cwd(), "public/images");
    console.log("Serving images from:", imagesPath);
    app.use("/images", express.static(imagesPath));

    const PORT = process.env.PORT_SERVER || 6001;
    startServer(app, PORT);
  } catch (error) {
    console.error("Server initialization failed:", error.message);
    process.exit(1);
  }
}

initializeServer();
