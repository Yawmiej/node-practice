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

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
