const Course = require('./../models/courseModel');
const APIFeatures = require('./../utilities/courseDbContext');

exports.getAllcourses =   async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Course.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const courses = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: courses.length,
      data: {
        courses
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getcourse = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Course.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createCourse = async  (req, res) => {
  try {
    // const newCourse = new Course({})
    // newCourse.save()

    const newCourse = await Course.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        course: newCourse
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        course
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteCcourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};