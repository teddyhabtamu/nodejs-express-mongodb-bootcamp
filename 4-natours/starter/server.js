const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connections successful!');
  });

const port = process.env.PORT || 3000;

// console.log(process.env);

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
