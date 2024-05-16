import mongoose from "mongoose";
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstName: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    stream: { type: String, required: true },
    // rollNo_prefix: { type: String, required: true },
    rollNo: { type: String, unique: true, },
    prn: { type: String, required: true, unique: true },
    dob: { type: String, required: true }
}, { timestamps: true })


// Define static method to generate roll number
studentSchema.statics.generateRollNo = async function () {
    const lastStudent = await this.findOne({}).sort({ rollNo: -1 }).exec();
    if (lastStudent && lastStudent.rollNo) {
        const currentRollNo = lastStudent.rollNo;
        const prefix = currentRollNo.substring(0, 2); // Extract prefix
        const number = parseInt(currentRollNo.substring(2)); // Extract number
        const nextNumber = number + 1;
        return prefix + nextNumber.toString().padStart(4, '0'); // Combine prefix and incremented number
    } else {
        return 'FT0001'; // Default roll number
    }
};

// Middleware to automatically set rollNo before saving
studentSchema.pre('save', async function (next) {
    if (!this.rollNo) {
        this.rollNo = await this.constructor.generateRollNo();
    }
    next();
});



const Student = mongoose.model("Student", studentSchema);
export default Student;