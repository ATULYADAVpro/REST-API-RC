import Joi from "joi";
import StudentAddModels from "../../models/studentModels/studentAddModels.js";
import SemesterDetails from "../../models/studentModels/SemesterDetails_Models.js";
import CustomErrorHandler from "../../utils/services/CustomErrorHandler.js";


const studentControllers = {
    getAllStudents(req, res) {
        res.send("Working")
    },
    async addStudent(req, res, next) {
        //------ Validate ------
        const studentAddSchema = Joi.object({
            firstName: Joi.string().min(3).required(),
            fatherName: Joi.string().min(3).required(),
            motherName: Joi.string().min(3).required(),
            stream: Joi.string().min(3).required(),
            prn: Joi.string().min(3).required(),
            dob: Joi.string().required(),
            rollNoPrefix: Joi.string().required()

        })
        const { error } = studentAddSchema.validate(req.body);
        if (error) { return next(error) }
        const { firstName, fatherName, motherName, stream, prn, dob, rollNoPrefix } = req.body;

        // ------- check User already exist -----
        try {
            const exist = await StudentAddModels.exists({ prn, rollNoPrefix })
            if (exist) {
                return next(CustomErrorHandler.alreadyExist("Already Student Taken Addmission"))
            }
            let addmission = new StudentAddModels({ firstName, fatherName, motherName, stream, prn, dob, rollNoPrefix })
            await addmission.save();

            res.status(200).json({ Store: addmission })

        } catch (err) {
            return next(err)
        }


    }
}

export default studentControllers;