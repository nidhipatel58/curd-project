import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

// Load the Swagger YAML file
const swaggerDocument = YAML.load("./api/swagger/api.yaml");

// Export the Swagger middleware
export const swaggerServe = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(swaggerDocument);
