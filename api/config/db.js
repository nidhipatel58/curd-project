import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const configModule = {
  development: {
    use_env_variable: "DB_URL",
    dialect: "postgres",
    logging: false,
  },
  production: {
    use_env_variable: "DB_URL",
    dialect: "postgres",
    logging: false,
  },
};

const env = process.env.NODE_ENV || "development";
const config = configModule[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

export default sequelize;
