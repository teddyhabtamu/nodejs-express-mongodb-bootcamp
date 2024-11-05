const { error } = require('console');
const fs = require('fs');

const server = require('http').createServer();

server.on('request', (req, res) => {
  // Solution 1
  // fs.readFile('test-file.txt', 'utf-8', (err, data)=>{
  //   if (err) throw err
  //   res.end(data);
  // });

  // Solution 2: Streams
  // const readable = fs.createReadStream('text-file.txt')
  // readable.on('data', chunk =>{
  //   res.write(chunk);
  // })
  // readable.on('end', ()=>{
  //   res.end();
  // })
  // readable.on('error', (err)=>{
  //   console.log(err);
  //   res.statusCode = 500
  //   res.end("File not found");
  // })


  // Solution 3
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
});



server.listen(8001, '127.0.0.1', ()=>{
  console.log("server is running on 8001")
})
