import Joi from "joi";
import StudentAddModels from "../../models/studentModels/studentAddModels.js";
import SemisterDetails from "../../models/studentModels/SemesterDetails_Models.js";
import CustomErrorHandler from "../../utils/services/CustomErrorHandler.js";
import SubjectDetails from "../../models/studentModels/subjectModel.js";


const studentControllers = {
    async getAllStudents(req, res) {
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


    },

    async addSemister(req, res, next) {
        const { rollNo, semNo, semYear, semStudent_Type } = req.body;
        const studentExits = await StudentAddModels.findOne({ rollNo })
        if (!studentExits) { return next(CustomErrorHandler.notFoundData()) }

        const semisterExist = await SemisterDetails.findOne({ semNo, semYear })
            .populate({
                path: 'student_Details',
                match: { rollNo } // Filter the populated documents by rollNo
            });

        // Check if semesterDetails and student details are found
        if (!semisterExist || !semisterExist.student_Details) {
            const setSemister = new SemisterDetails({
                rollNo,
                semNo,
                semYear,
                semStudent_Type,
                student_Details: studentExits._id
            })
            studentExits.semester = studentExits.semester.concat(setSemister._id);

            await studentExits.save();
            await setSemister.save();

            res.json({ studentExits, setSemister })
        } else {
            return next(CustomErrorHandler.alreadyExist("Alread taken"))
        }


    },

    async addSubjects(req, res, next) {
        const { rollNo, semNo, semYear, subjectName, subjectCode, internalMark, externalMark } = req.body;

        try {
            // Check if semester exists with given semNo and semYear
            const semesterExists = await SemisterDetails.findOne({ semNo, semYear })
                .populate({ path: "student_Details", match: { rollNo } })
                .populate({ path: "subjects" });

            // If semester or student doesn't exist, throw an error
            if (!semesterExists || !semesterExists.student_Details) {
                return next(CustomErrorHandler.alreadyExist("Semester or student does not exist."));
            }

            // Check if the subject already exists
            const subjectExists = semesterExists.subjects.find(subject => subject.subjectCode === subjectCode);

            if (!subjectExists) {
                // If subject doesn't exist, create a new subject and add it to the semester
                const newSubject = new SubjectDetails({ subjectName, subjectCode, internalMark, externalMark });
                await newSubject.save();

                semesterExists.subjects.push(newSubject);
                await semesterExists.save();

                return res.json({ message: "Subject added successfully" });
            } else {
                return res.json({ message: "Subject already exists" });
            }
        } catch (error) {
            return next(error); // Pass any errors to the next middleware
        }
    }

}

export default studentControllers;