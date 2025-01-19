import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const sequelize = new Sequelize(process.env.DB_URL,
  {
    dialect: "postgres",
    logging: false,
  }
);

// Connection to PostgreSQL:-
sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Unable to connect to the database:", err));

export default sequelize;
