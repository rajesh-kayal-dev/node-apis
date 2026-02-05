const express = require('express');
const app = express();
const studentRoutes = require('./routes/students.routes');
const connectDB = require('./config/database');

connectDB();

const PORT = process.env.PORT


app.use(express.json());
app.use(express.urlencoded({ extended: true }));// to pas form data

// Student routes
app.use('/api/students', studentRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});