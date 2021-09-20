import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import aws from 'aws-sdk';
import env from '../env.config';

const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET_NAME } = env;

const s3 = new aws.S3({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },

  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const uploadS3 = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type, only JPEG and PNG is allowed!'));
    }
  },
  storage: multerS3({
    s3,
    bucket: BUCKET_NAME,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, 'image-repository/' + Date.now().toString() + '-' + file.originalname);
    },
  }),
});

export { upload, uploadS3 };
