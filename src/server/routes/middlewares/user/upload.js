require('../../../config/database');
const fileUpload = require('express-fileupload');
const fs = require('fs');

module.exports = function(router) {

    router.use(fileUpload());

    router.post('/', (req, res) => {

        let imgFile = req.files.justificatif;
        // define the file name
        let fileName = req.files.justificatif.name;
        // check the extension file
        let regex = /^pdf$|^jpg$|^jpeg$|^png$/;
        let fileExt = fileName.split('.').pop();

        if(regex.test(fileExt)) {

            // define the absence years
            let posYears = fileName.indexOf("-") + 1;
            let getYears = fileName.slice(posYears, posYears + 4);
            // define the folder
            // let filePath = './client/assets/justificatif/' + getYears + '/';
            let filePath = './client/src/assets/justificatif/' + getYears + '/';
            // let filePath = './' + getYears + '/';
            // console.log('---- DIRNAME', __dirname);
            // check if the folder exists
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath);
            }

            // moove the file
            if (imgFile) {
                imgFile.mv(filePath + fileName, (err) => {
                    if (err) console.log(err);
                    res.send('success')
                })
            }
        } else {
            res.send('error')
        }

    });
};
