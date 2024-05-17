// ======== Importing =========
import express from "express";
const app = express();
import { PORT } from "./src/configs/index.js";
import studentRouter from "./src/routers/studentRouter/studentRouter.js";
import DB_connection from './src/utils/database/connection.js';
import teacharRouter from "./src/routers/teacharRouter/teacharRouter.js";
import adminRouter from "./src/routers/adminRouter/adminRouter.js";
import errorHandler from "./src/middleware/errorHandler.js";

// ======== Middleware ========
app.use(express.json());
// -------- routes -----
app.use("/student", studentRouter);
app.use("/teachar", teacharRouter)
app.use("/admin", adminRouter);

// -----Global Middleware 
app.use(errorHandler)
// ======= Connection Start =====
DB_connection().then(() => {
    app.listen(PORT, () => { console.log(`server start http://localhost:${PORT}`) });
}).catch((err) => { console.log("connection Fail..." + err) });