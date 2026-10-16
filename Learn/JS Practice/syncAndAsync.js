//Blocking code(Synchronous code)
const fs = require('fs');
const data = fs.readFileSync('file.txt', 'utf8');
console.log(data);

//Non-blocking code(Asynchronous code)
fs.readFile('output.txt','Hello World!', (dta) => {
    if (err) return console.log(err);
    console.log(data);
});


console.log("This runs immediately");
