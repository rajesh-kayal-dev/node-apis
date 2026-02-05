const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Student = require('../models/student.model');

mongoose.connect('mongodb://localhost:27017/student-crud')

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error :' + err.message });
    }
});

// Get a student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error :' + error.message });
    }
});

// Create a new student
router.post('/', async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        res.status(201).json(newStudent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error :' + error.message });
    }
});

// Update a student by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(updatedStudent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error :' + error.message });
    }
});

// Delete a student by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error :' + error.message });
    }
});

//Delete all students
router.delete('/', async (req, res) => {
    try {
        await Student.deleteMany();
        res.json({ message: 'All students deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error :' + error.message });
    }
});

module.exports = router;