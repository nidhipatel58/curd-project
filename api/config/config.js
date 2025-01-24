import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

// Load the Swagger YAML file
const swaggerDocument = YAML.load("./api/swagger/api.yaml");

// Export the Swagger middleware
export const swaggerServe = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(swaggerDocument);

// ------------------------------------------------------------------------------
// import swaggerJsdoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";

// const Options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "CRUD API Documentation",
//       version: "1.0.0",
//       description: "API documentation for CRUD operations",
//     },
//     servers: [
//       {
//         url: "http://localhost:3003",
//       },
//     ],
//   },
//   apis: ["./api/routes/*.js"],
// };

// const swaggerSpec = swaggerJsdoc(Options);

// export const swaggerServe = swaggerUi.serve;
// export const swaggerSetup = swaggerUi.setup(swaggerSpec);
