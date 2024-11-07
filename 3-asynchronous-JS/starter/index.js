const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');
const { reject } = require('superagent/lib/request-base');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I coudn't find the file");
      resolve(data);
    });
  });
};

const appendFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(file, `\n${data}`, (err) => {
      if (err) reject("Can't write the file");
      resolve(console.log('Successfully saved'));
    });
  });
};

// by using async await

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    const res1 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1, res2, res3]);
    const imgs = all.map(el=> el.body.message)
    console.log(imgs);

    await appendFilePro(`./dog-img.txt`, imgs.join(''));
    console.log('Random dog img sucessfuly saved');
  } catch (err) {
    console.log('Error:', err);
    throw err;
  }
  return '2: Ready 🍊';
};

(async () => {
  try {
    console.log('1: will get dog pics');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done!');
  } catch (err) {
    console.log('Sorry for that');
  }
})();

/*
console.log('1: will get dog pics')
getDogPic().then((x)=>{
  console.log(x);
  console.log('3: Done!')
}).catch(err =>{
  console.log("Sorry for that")
});
*/

//by using promises

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     appendFilePro(`./dog-img.txt`, res._body.message);
//   })
//   .then(() => {
//     console.log('Random dog img sucessfuly saved');
//   })
//   .catch((err) => {
//     console.log('Error:', err.message);
//   });
