const EventEmitter = require('events');
const http = require('http');


// class Sales extends EventEmitter {
//   constructor() {
//     super()
//   }
// }

// const myEmmiter = new Sales();
// myEmmiter.on('newSale', ()=>{
//   console.log('There was a new sale')
// })

// myEmmiter.on('newSale', ()=>{
//   console.log('Customer name: Teddy')
// })

// myEmmiter.on('newSale', (noProduct)=>{
//   console.log(`The customer wants ${noProduct} products`);
// })

// const numberOfProduct = 9
// myEmmiter.emit('newSale', numberOfProduct);


///////////////////////////////////////////////

const server = http.createServer();

server.on('request', (req, res)=>{
  console.log('Request recieved')
  console.log(req.url)
  res.end('Request recieved');
})

server.on('request', (req, res) => {
  console.log('Another request');
});

server.on('close', ()=>{
  console.log('Server closed')
})

server.listen(8001, '127.0.0.1', ()=>{
  console.log('server is running on port 8001');
})


