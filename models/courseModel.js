const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    courseName: {
        type: String,
        required: [true, 'A course name must have a name'],
        unique: true,
        trim: true,
        maxlength: [40, 'A course name must have less or equal then 40 characters'],
        minlength: [10, 'A course name must have more or equal then 10 characters']
     
    },
    image:{
        type: String
    },
    from: {
        type: String,
        required: [true, 'A from must have a department name'],
        unique: true,
        trim: true,
        maxlength: [40, 'A from  must have less or equal then 40 characters'],
        minlength: [10, 'A from  must have more or equal then 10 characters']
    },
    instructor: {
        type: String,
        required: [true, 'A instructor must have a intrusctor  name'],
        unique: true,
        trim: true,
        maxlength: [40, 'A instructor  must have less or equal then 40 characters'],
        minlength: [10, 'A instructor  must have more or equal then 10 characters']
    },
    credits: {
        type: Number,
        default: 3,
        min: [1, 'credits must be above 1'],
        max: [5, 'credits must be below 4']
    },
    description: {
        type: String,
        required: [true, 'A description must have a intrusctor  name'],
        unique: true,
        trim: true,
        maxlength: [40, 'A description  must have less or equal then 40 characters'],
        minlength: [10, 'A description  must have more or equal then 10 characters']
    },

});
const Course = mongoose.model('Courses', courseSchema);

module.exports = Course;