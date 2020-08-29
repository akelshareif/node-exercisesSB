const axios = require('axios');
const fs = require('fs');

const cat = (path, writeTo = null) => {
    if (writeTo) {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                console.log('Error: ', err);
                process.exit(1);
            } else {
                fs.writeFile(writeTo, data, 'utf8', (err) => {
                    if (err) {
                        console.log('Error: ', err);
                        process.exit(1);
                    }
                });
            }
        });
    } else {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                console.log('Error: ', err);
                process.exit(1);
            } else {
                console.log(data);
            }
        });
    }
};

const webCat = async (url, writeTo = null) => {
    if (writeTo) {
        const { data } = await axios.get(url);
        fs.writeFile(writeTo, data, 'utf8', (err) => {
            if (err) {
                console.log('Error: ', err);
                process.exit(1);
            }
        });
    } else {
        const { data } = await axios.get(url);
        console.log(data);
    }
};

const urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
const filePattern = /([a-zA-Z0-9\s_\\.\-\(\):])+(.txt)$/i;

if (process.argv[2].match(filePattern) && process.argv[3]) {
    if (process.argv[3].match(urlPattern)) {
        webCat(process.argv[3], process.argv[2]);
    } else {
        cat(process.argv[3], process.argv[2]);
    }
} else {
    if (process.argv[2].match(urlPattern)) {
        webCat(process.argv[2]);
    } else {
        cat(process.argv[2]);
    }
}
