const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    course: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        enum:["Male","Female","Other"] ,
        required: true,
    },
    profile_pic:{
        type: String,
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;