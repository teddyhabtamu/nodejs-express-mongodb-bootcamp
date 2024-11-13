const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val)=>{
  console.log(`Tour ID is: ${val}`);
  if (req.params.id * 1 > tours.length - 1) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID ',
    });
  }
  next();
}

exports.checkBody = ((req, res, next) => {
  if (!('name' in req.body && 'duration' in req.body)) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Not enough Information, missing name or duration"
    })
  }
  next();
});

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);

  res.status(200).json({
    status: 'success',
    data: {
      tours: tours[req.params.id * 1],
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated tour here ....',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};