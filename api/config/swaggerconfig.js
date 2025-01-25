import swaggerAutogen from "swagger-autogen";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import fs from "fs/promises";

// Path:-
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Paths for Swagger generation:-
const swaggerOutputFile = resolve(__dirname, "../swagger/swagger.json");
const swaggerEndpointsFiles = [resolve(__dirname, "../server.js")];

// Swagger file exist or not:-
async function generateSwaggerFile() {
  try {
    await fs.access(swaggerOutputFile);
    console.log("Swagger file found.");
  } catch (error) {
    console.log("Swagger file not found. Generating...");
    const swaggerAutogenInstance = swaggerAutogen();
    await swaggerAutogenInstance(swaggerOutputFile, swaggerEndpointsFiles);
    console.log("Swagger file generated.");
  }
}

// Import Swagger file:-
async function loadSwaggerFile() {
  const swaggerFileUrl = new URL(
    `file://${resolve(__dirname, "../swagger/swagger.json")}`
  );
  const swaggerFile = await import(swaggerFileUrl, {
    assert: { type: "json" },
  });
  return swaggerFile.default;
}

export { generateSwaggerFile, loadSwaggerFile };
