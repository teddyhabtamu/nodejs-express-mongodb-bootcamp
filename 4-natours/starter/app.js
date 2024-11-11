const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');

const app = express();
const port = 3000;

// 1. Middlewares

app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('HI from the middleware 🕊');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/api/v1/tours', getAllTours);
// app.get(`/api/v1/tours/:id`, getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// 3. Routes: this is a router

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4. Start the Server

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
