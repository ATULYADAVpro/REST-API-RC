// ======== Importing =========
import express from "express";
const app = express();
import { PORT } from "./src/configs/index.js";
import studentRouter from "./src/routers/studentRouter/studentRouter.js";
import DB_connection from './src/utils/database/connection.js'
// ======== Middleware ========
app.use("/student", studentRouter);

// ======= Connection Start =====
DB_connection().then(() => {
    app.listen(PORT, () => { console.log(`server start http://localhost:${PORT}`) });
}).catch((err) => { console.log("connection Fail..." + err) })