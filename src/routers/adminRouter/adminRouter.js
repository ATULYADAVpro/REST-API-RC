// ========= Importing ========
import { Router } from 'express'
import adminControllers from '../../controllers/adminControllers.js/adminContollers.js';
const adminRouter = Router();

adminRouter.get("/", adminControllers.getAllAdmin)

export default adminRouter;