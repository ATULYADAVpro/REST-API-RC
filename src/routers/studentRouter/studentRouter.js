import studentControllers from '../../controllers/studentControllers/studentControllers.js';
import express from 'express';
const studentRouter = express.Router();

studentRouter.get("/", studentControllers.getAllStudents)

export default studentRouter;