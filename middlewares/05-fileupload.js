const fileUpload = require('express-fileupload');
const path = require('path');

module.exports = fileUpload({
  useTempFiles: true,
  tempFileDir: path.join('.', 'public', 'assets', 'photos')
});
