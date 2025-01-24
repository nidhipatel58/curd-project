import dotenv from "dotenv";
import http from "http";
import express from "express";
import cors from "cors";
import db from "./api/models/index.js";
import routes from "./api/routes/index.js";
import { swaggerServe, swaggerSetup } from "./api/config/config.js";
dotenv.config();
const app = express();

// CORS
app.use(
  cors({
    origin: "*",
  })
);

// Body-Parser:-
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes:-
app.use("/api", routes);

// Swagger Route:-
app.use("/api-docs", swaggerServe, swaggerSetup);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Root endpoint
 *     tags: [General]
 *     responses:
 *       200:
 *         description: Welcome message
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Hello World"
 */

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// Database Connection:-
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connected successfully!");

    await db.sequelize.sync({ force: false });
    console.log("Tables synced successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();

// Server Setup:-
const PORT = process.env.PORT_SERVER || 6001;

http.createServer(app).listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});

export default app;
