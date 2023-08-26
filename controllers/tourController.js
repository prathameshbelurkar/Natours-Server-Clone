const Tour = require('../models/tourModel');

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    return res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.getAllTours = async (req, res) => {
  try {
    const allTours = await Tour.find({});
    return res.status(200).json({
      status: 'success',
      data: allTours,
      results: allTours.length,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const { params } = req;
    const tour = await Tour.findById(params.id);
    return res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
      message: 'Id passed is incorrect.',
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const { params, body } = req;
    const tour = await Tour.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: 'Cannot update.',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const { params } = req;
    const tour = await Tour.findByIdAndDelete(params.id);
    return res.status(204).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: 'Failed to delete.',
    });
  }
};
