import bodyParser from "body-parser";
import express from "express";
import crackHashRoutes from "./routes/crack-hash.route";
import hashPasswordRoutes from "./routes/hash-password.route";
import interfaceRoutes from "./routes/interface.route";

//Setup and configure app
const app = express();
const port = 3333;

//Global Middleware
app.use(bodyParser.json());

//Routes
app.use(crackHashRoutes);
app.use(hashPasswordRoutes);
app.use(interfaceRoutes);

//Initialize app
app.listen(port, () => console.log(`Server listening on port ${port}!`));
