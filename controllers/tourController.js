const fs = require('fs');
const path = require('path');

// Read file
const filePath = path.join(
  __dirname,
  '..',
  'dev-data',
  'data',
  'tours-simple.json'
);
const tours = JSON.parse(fs.readFileSync(filePath));

exports.getAllTours = (req, res) => {
  return res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((t) => t.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  return res.status(200).json({ status: 'success', data: { tour } });
};

exports.createTour = (req, res) => {
  const body = req.body;
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, body);
  tours.push(newTour);

  fs.writeFile(filePath, JSON.stringify(tours), (err) => {
    return res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
};

exports.updateTour = (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: {
      tour: 'PATCH REQUEST DEMO',
    },
  });
};

exports.deleteTour = (req, res) => {
  return res.status(204).json({
    status: 'success',
    data: null,
  });
};
