import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import dotenv from "dotenv";
import sequelize from "../config/db.js";

dotenv.config();

const basename = path.basename(new URL(import.meta.url).pathname);
const db = {};

const loadModels = async () => {
  const dirPath = path.dirname(new URL(import.meta.url).pathname);

  const files = fs.readdirSync(dirPath).filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  });

  for (const file of files) {
    const model = (await import(path.join(dirPath, file))).default;
    db[model.name] = model;
  }

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
};

// loadModels()
//   .then(() => console.log("Models loaded and associations set up"))
//   .catch((error) => console.error("Error loading models:", error));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
