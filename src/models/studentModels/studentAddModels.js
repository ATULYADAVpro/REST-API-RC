import mongoose from "mongoose";
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstName: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    stream: { type: String, required: true },
    rollNoPrefix: { type: String, required: true },  // New field for dynamic prefix
    rollNo: { type: String, unique: true },
    prn: { type: Number, required: true, unique: true },
    dob: { type: String, required: true },
    semester: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SemesterDetails' }]
}, { timestamps: true });

// Define static method to generate roll number with dynamic prefix
studentSchema.statics.generateRollNo = async function (prefix) {
    const lastStudent = await this.findOne({ rollNo: new RegExp(`^${prefix}`) }).sort({ rollNo: -1 }).exec();
    if (lastStudent && lastStudent.rollNo) {
        const currentRollNo = lastStudent.rollNo;
        const number = parseInt(currentRollNo.substring(prefix.length)); // Extract number after prefix
        const nextNumber = number + 1;
        return prefix + nextNumber.toString().padStart(4, '0'); // Combine prefix and incremented number
    } else {
        return prefix + '0001'; // Default roll number
    }
};

// Middleware to automatically set rollNo before saving
studentSchema.pre('save', async function (next) {
    if (!this.rollNo) {
        if (!this.rollNoPrefix) {
            throw new Error('rollNoPrefix is required to generate roll number');
        }
        this.rollNo = await this.constructor.generateRollNo(this.rollNoPrefix);
    }
    next();
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
