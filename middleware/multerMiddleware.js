import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const filename = file.originalname;
    cb(null, file.fieldname);
  },
});

const upload = multer({ storage: storage });

export default upload;
