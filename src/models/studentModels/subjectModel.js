import mongoose from 'mongoose';
const { Schema } = mongoose;

// SubjectDetails Schema
const subjectDetailsSchema = new Schema({
    subjectCode: { type: String, required: true },
    subjectName: { type: String, required: true },
    internalMark: { type: Number, required: true },
    externalMark: { type: Number, required: true }
}, { timestamps: true });

const SubjectDetails = mongoose.model('SubjectDetails', subjectDetailsSchema);

export default SubjectDetails;