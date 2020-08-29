const axios = require('axios');
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

const webCat = async (url) => {
    const { data } = await axios.get(url);
    console.log(data);
};

const re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;

if (process.argv[2].match(re)) {
    webCat(process.argv[2]);
} else {
    cat(process.argv[2]);
}
