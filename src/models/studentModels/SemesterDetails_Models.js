import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SemesterDetailsSchema = new Schema({
    semNo: { type: String, required: true },
    semYear: { type: String, required: true },
    semStudent_Type: { type: String, required: true },
    student_Details: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubjectDetails' }]
}, { timestamps: true });

const SemesterDetails = mongoose.model("SemesterDetails", SemesterDetailsSchema);
export default SemesterDetails; 