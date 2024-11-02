const fs = require("fs");
const http = require("http")
const url = require("url")


////////////////////////////////////////////////////////////
// File write and Read
///////////////////////////////////////////////////////////

// fs.readFile("./txt/start.txt", "utf-8", (error, data)=>{
//   if (error) throw error;
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (error, data1)=>{
//     if (error) throw error;
//     fs.readFile("./txt/append.txt", "utf-8", (error, data2)=>{
//       if (error) throw error;
//       fs.writeFile("./txt/new.txt", `${data1} \n ${data2}`, "utf-8", (error)=>{
//         if (error){
//           console.log("Error: ", error)
//         }
//         console.log("Successfully Written")
//       })
//     })
//   })
// })
// console.log("The file will be written!")


///////////////////////////////////////////////////////
// SERVER
////////////////////////////////////////////////////////

const replaceTemplate = (temp, product)=>{
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%IMG%}/g, product.image);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if(!product.organic){
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return output;
}

// Load the templates for HTML pages
const tempOverview = fs.readFileSync(`${__dirname}/templates/template_overview.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template_product.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");

// Load JSON data (make sure this points to a valid JSON file)
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);  // Parse the JSON data

const server = http.createServer((req, res) => {
  const { query , pathname } = url.parse(req.url, true)
  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardHtml = dataObj.map((el)=>replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARD%}', cardHtml)
    
    res.end(output);

    // Product page
  } else if (pathname === "/product") {

    const product = dataObj[query.id]
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API
  } else if (pathname === '/api') {
    console.log(productData)
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end("API");

    // Not Found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    });
    res.end("<h1>Page not found</h1>")
  }

});

server.listen(8002, "127.0.0.1", ()=>{
  console.log("server is running on 8002")
});

