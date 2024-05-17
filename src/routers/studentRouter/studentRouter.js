import studentControllers from '../../controllers/studentControllers/studentControllers.js';
import express from 'express';
const studentRouter = express.Router();

studentRouter.get("/", studentControllers.getAllStudents);
studentRouter.post("/add", studentControllers.addStudent);
// studentRouter.post("/addSemister", studentControllers.addSemister);
// studentRouter.post("/getSemister", studentControllers.getSemister);

export default studentRouter;