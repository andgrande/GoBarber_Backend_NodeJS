import path from 'path';
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';

const tempDirectoy = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';

  directory: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: `Record<string, unknown>`;
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  directory: tempDirectoy,
  uploadsFolder: path.resolve(tempDirectoy, 'uploads'),

  // diskStorage gives full control over file upload configurations

  multer: {
    storage: multer.diskStorage({
      destination: tempDirectoy,
      // function receives the request, the file and returns as callback function
      filename(request, file, cb) {
        // generating a hash to avoid duplicity in filenames
        const fileNameHash = crypto.randomBytes(12).toString('hex');
        const filename = `${fileNameHash}-${file.originalname}`;

        // returning null in case of error OR the filename itself
        return cb(null, filename);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: 'app-gobarber-2',
    },
  },
} as IUploadConfig;
