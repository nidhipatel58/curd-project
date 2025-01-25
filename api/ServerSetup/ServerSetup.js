import http from "http";

const startServer = (app, PORT) => {
  http.createServer(app).listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
};

export default startServer;
