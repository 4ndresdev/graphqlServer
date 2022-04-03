import mongoose from "mongoose";

const EmployeeScheme = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    nationality: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    civilStatus: {
        type: String,
        required: true,
        trim: true
    },
    birthday: {
        type: String,
        required: true,
        trim: true
    }
})

export default mongoose.model('Employee', EmployeeScheme)