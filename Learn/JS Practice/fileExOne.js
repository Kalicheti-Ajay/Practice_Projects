const fs = require('fs');
//Reading files

fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) return console.error(err);
    console.log(data);
});

//Writing files
fs.writeFile('hw.js', console.log('Hello, World!'), (err) => {
    if (err) return console.error(err);
    console.log('File written successfully');
});

//Creating directories
fs.mkdir('logs', { recursive: true }, (err) => {
    if (err) return console.error(err);
    console.log('Directory created successfully');
});