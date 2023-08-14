const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const express = require('express');
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Read file
const filePath = path.join(__dirname, 'dev-data', 'data', 'tours-simple.json');
const tours = JSON.parse(fs.readFileSync(filePath));

const getAllTours = (req, res) => {
  return res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } });
};

const getTour = (req, res) => {
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

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: {
      tour: 'PATCH REQUEST DEMO',
    },
  });
};

const deleteTour = (req, res) => {
  return res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAllUsers = (req, res) => {
  return res.status(500).send({
    status: 'err',
    message: 'This route is not ye defined!',
  });
};

const createUser = (req, res) => {
  return res.status(500).send({
    status: 'err',
    message: 'This route is not ye defined!',
  });
};

const getUser = (req, res) => {
  return res.status(500).send({
    status: 'err',
    message: 'This route is not ye defined!',
  });
};

const updateUser = (req, res) => {
  return res.status(500).send({
    status: 'err',
    message: 'This route is not ye defined!',
  });
};

const deleteUser = (req, res) => {
  return res.status(500).send({
    status: 'err',
    message: 'This route is not ye defined!',
  });
};

// routes
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
