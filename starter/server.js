const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './.env' });

const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('DB Connected');
  })
  .catch((err) => {
    console.log(err);
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'Price must be set'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const toursModel = new Tour({
  name: 'The Forest Hiker',
  price: 5000,
  rating: 4.6,
});

toursModel
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => console.log('Error: , err'));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
