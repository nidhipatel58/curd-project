import dotenv from "dotenv";
import http from "http";
import express from "express";
import cors from "cors";
import sequelize from "./api/config/db.js";
import routes from "./api/routes/index.js";
const app = express();

// CORS
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Body-Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", routes);

// Database Connection
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Tables created successfully!");
  })
  .catch((error) => {
    console.error("Error creating tables:", error);
  });

// Server Setup
const PORT = process.env.PORT_SERVER || 6001;

http.createServer(app).listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});

export default app;
