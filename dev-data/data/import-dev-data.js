const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');
dotenv.config({ path: '../../config.env' });

// DB CONFIG
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
const dbConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

// READ JSON FILE
const toursSimpleFileContent = fs.readFileSync(
  path.join(__dirname, 'tours-simple.json'),
  'utf-8',
);
const tours = JSON.parse(toursSimpleFileContent);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany({});
    console.log('Data successfully deleted!');
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

// CONNECT TO DB
const connectDB = async (DB, dbConfig) => {
  try {
    const connection = await mongoose.connect(DB, dbConfig);
    return connection;
  } catch (err) {
    console.error(err);
  }
};

// PERFORMING ACTIONS
connectDB(DB, dbConfig)
  .then((c) => {
    console.log('Connected to DB!');
    if (process.argv[2] === 'import') {
      importData();
    }
    if (process.argv[2] === 'delete') {
      deleteData();
    }
  })
  .catch((err) => {
    console.error(err);
  });
