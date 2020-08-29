const fs = require('fs');

const cat = (path) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log('Error: ', err);
            process.exit(1);
        } else {
            console.log(data);
        }
    });
};

cat(process.argv[2]);
