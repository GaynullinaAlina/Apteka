const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, '/img/')
    },
    filename(req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})
