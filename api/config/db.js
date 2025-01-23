// import dotenv from "dotenv";
// import { Sequelize } from "sequelize";

// // Load environment variables from the .env file
// dotenv.config();

// // Ensure all necessary DB variables are available in process.env
// // if (!process.env.DB_URL) {
// //   throw new Error("Database URL not found in .env file");
// // }

// // if (!DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT || !DB_NAME) {
// //   throw new Error(
// //     "Database connection details (user, password, host, port, name) are missing in .env file."
// //   );
// // }

// const sequelize = new Sequelize(
//   "postgres://postgres:password@123@localhost:5432/users_db",
//   {
//     host: "localhost",
//     dialect: "postgres",
//     port: 5432, // Default to 5432 if DB_PORT is not defined
//     logging: false, // Set to true if you want to see SQL queries in the console
//   }
// );

// // Test the database connection
// sequelize
//   .authenticate()
//   .then(() => console.log("Database connected successfully"))
//   .catch((err) => console.error("Unable to connect to the database:", err));

// export default sequelize;

// // const config = {
// //   development: {
// //     username: "postgres",
// //     password: "password@123",
// //     database: "users_db",
// //     host: "localhost",
// //     dialect: "postgres",
// //   },
// //   production: {
// //     username: process.env.DB_USERNAME,
// //     password: process.env.DB_PASSWORD,
// //     database: process.env.DB_NAME,
// //     host: process.env.DB_HOST,
// //     dialect: "postgres",
// //   },
// // };

// // export default config;
import { Sequelize } from "sequelize";

const configModule = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password@123",
    database: process.env.DB_NAME || "users_db",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  },
  production: {
    use_env_variable: "DATABASE_URL",
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
