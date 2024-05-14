import { Router } from 'express';
import teacharControllers from '../../controllers/teacharControllers/teacharContollers.js';
const teacharRouter = Router();

teacharRouter.get("/", teacharControllers.getAllTeachar)

export default teacharRouter;