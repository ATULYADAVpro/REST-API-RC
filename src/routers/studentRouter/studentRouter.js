import studentControllers from '../../controllers/studentControllers/studentControllers.js';
import express from 'express';
const studentRouter = express.Router();

// =============== Add Data ===================
studentRouter.post("/add", studentControllers.addStudent);
studentRouter.post("/addSemister", studentControllers.addSemister);
studentRouter.post("/addSemister/addSubject", studentControllers.addSubjects);

// ============== GET DATA ==================
studentRouter.get("/all", studentControllers.getAllStudent);
studentRouter.get("/singal/:rollNo", studentControllers.getSingalStudent);



export default studentRouter;