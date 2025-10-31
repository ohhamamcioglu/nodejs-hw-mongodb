import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Mock storage for demo purposes - simulates Cloudinary
const mockStorage = multer.memoryStorage();

// Mock middleware that simulates Cloudinary upload
const mockUpload = multer({ storage: mockStorage });

// Override the single method to add mock URL
const originalSingle = mockUpload.single;
mockUpload.single = (fieldName) => {
  const middleware = originalSingle.call(mockUpload, fieldName);
  return (req, res, next) => {
    middleware(req, res, (err) => {
      if (err) return next(err);
      
      // Mock Cloudinary URL if file exists
      if (req.file) {
        req.file.path = `https://res.cloudinary.com/demo/image/upload/v1698765432/contacts/mock_photo_${Date.now()}.jpg`;
      }
      next();
    });
  };
};

export const upload = mockUpload;

export const uploadToCloudinary = async (filePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: 'contacts',
  };

  try {
    const result = await cloudinary.v2.uploader.upload(filePath, options);
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};