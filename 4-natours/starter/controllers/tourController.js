const Tour = require('../models/tourModel');
const APIFeatures = require('../utiles/apiFeatures');
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary, difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // BUILD A QUERY
    // 1. Filteringg
    // const queryObj = { ...req.query };
    // const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // excludedFields.forEach((el) => delete queryObj[el]);

    // // 2. Advanced filtering
    // const queryStr = JSON.stringify(queryObj).replace(
    //   /\b(gte|gt|lte|lt)\b/g,
    //   (match) => `$${match}`,
    // );
    // let query = Tour.find(JSON.parse(queryStr));

    // 3. Sorting
    // if (req.query.sort) {
    //   const querySort = req.query.sort.split(',').join(' ');
    //   console.log('newSort:', querySort);
    //   query = query.sort(querySort);
    // } else {
    //   query = query.sort('-createdAt');
    // }

    // 4. Field limiting
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ');
    //   query = query.select(`-_id ${fields}`);
    // } else {
    //   query = query.select('-__v');
    // }

    // 5. Pagination
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;
    // query = query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw new Error('The page does not found');
    // }
    // Execute Query
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    // Send Response
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    console.error('Error:', err); // Log the actual error to the console
    res.status(404).json({
      status: 'Failed',
      message: err.message || 'Something went wrong',
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({_id: req.params.id}) === Tour.findById(req.param.id)
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `Error: ${err}`,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `Error: ${err}`,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      message: 'Successfully deleted',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `Error: ${err}`,
    });
  }
};
