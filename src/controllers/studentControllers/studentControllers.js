import Joi from "joi";
import StudentAddModels from "../../models/studentModels/studentAddModels.js";

const studentControllers = {
    getAllStudents(req, res) {
        res.send("Working")
    },
    async addStudent(req, res) {
        //------ Validate ------
        const studentAddSchema = Joi.object({
            firstName: Joi.string().min(3).required(),
            fatherName: Joi.string().min(3).required(),
            motherName: Joi.string().min(3).required(),
            stream: Joi.string().min(3).required(),
            // rollNo: Joi.string().min(3).required(),
            // rollNo_prefix: Joi.string().min(2).required(),
            prn: Joi.string().min(3).required(),
            dob: Joi.string().required()

        })
        const { error } = studentAddSchema.validate(req.body);
        if (error) { console.log("Error From Validattion" + error) }

        // --------- check user already register ----------
        const { rollNo, prn, firstName, fatherName, motherName, stream, dob } = req.body;
        let studentExists = await StudentAddModels.exists({ rollNo: rollNo, prn: prn })
        if (studentExists) { console.log("Already exists" + studentExists) }
        const result = new StudentAddModels({ prn, firstName, fatherName, motherName, stream, dob })

        try {
            await result.save();
        } catch (err) {
            console.log("When save data error occurn :" + err)
        }
        res.json({ data: result })

    }
}

export default studentControllers;