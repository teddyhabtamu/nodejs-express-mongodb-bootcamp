const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
} = require('../controllers/tourController');

// Create a checkBody middleware
// Check if ody contains the name and price property
// If not, send back 400 (bad request)

const router = express.Router();

router.param('id', checkID);

router.route('/').get(getAllTours).post(checkBody, createTour); 

router.route(`/:id`).get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
