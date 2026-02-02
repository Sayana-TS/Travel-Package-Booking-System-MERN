import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Create multer instance
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 10 // Max 10 files at once
  }
});

// Process uploaded files
export const processUploadedFiles = (files) => {
  return files.map(file => {
    // Generate thumbnail URL (in production, use image processing library)
    const thumbnailUrl = `/thumbnails/${file.filename}`;
    
    // Get file stats
    const stats = fs.statSync(file.path);
    
    return {
      url: `/uploads/${file.filename}`,
      thumbnailUrl,
      fileName: file.originalname,
      fileSize: stats.size,
      mimeType: file.mimetype,
      dimensions: { width: 0, height: 0 }, // You'd use sharp or similar to get dimensions
      uploadedAt: new Date()
    };
  });
};

// Clean up temporary files
export const cleanupTempFiles = (files) => {
  files.forEach(file => {
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
  });
};

// Generate thumbnail (simplified - in production use sharp/gm)
export const generateThumbnail = async (sourcePath, destPath) => {
  // This is a placeholder - implement with actual image processing
  return new Promise((resolve) => {
    // Copy file as placeholder
    fs.copyFileSync(sourcePath, destPath);
    resolve(true);
  });
};

// Validate image dimensions
export const validateImageDimensions = (width, height, minWidth = 300, minHeight = 300) => {
  return width >= minWidth && height >= minHeight;
};