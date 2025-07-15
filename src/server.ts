import express from "express";
import dotenv from "dotenv";
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
import { connectDB } from "./config/db";
import PCBRoutes from "./routes/PCBRoutes";
import swaggerSpec from "./docs/swagger";
import cors from "cors";
//const cors = require("cors");


//set up database
dotenv.config();

const app = express();
const PORT = 3000;
app.use(cors({
    origin: 'http://172.16.16.54:5173',  // IP/Domain ของ frontend
    credentials: true
}));
app.use(express.json()); //allow us to accept JSON data in the req.body


app.use("/api/calculatePCB", PCBRoutes);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
)


app.listen(PORT, '172.16.16.38', () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT)
});