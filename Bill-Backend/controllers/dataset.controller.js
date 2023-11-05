import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Op } from 'sequelize';
import archiver from 'archiver';
import Dataset from '../models/dataset.model.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/uploads/');
  },
  filename: function (req, file, cb) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based, so add 1
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    const randomNum = '-' + Math.round(Math.random() * 1E9);

    const uniqueSuffix = `${year}${month}${day}${hours}${minutes}${seconds}${randomNum}`;

    const originalFileName = path.parse(file.originalname).name; // Get the original file name without extension
    const fileExtension = path.extname(file.originalname).toLowerCase(); // Get the file extension in lowercase

    const newFileName = `${originalFileName}-${uniqueSuffix}${fileExtension}`;
    cb(null, newFileName);
  }
});

const upload = multer({ storage: storage });

export const uploadDataset = (req, res, next) => {
  try {
    upload.array('files')(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'File upload error' });
      } else if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }
      req.uploadedFiles = req.files.map(file => file.path); // Store uploaded file paths in request object
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const processUpload = async (req, res) => {
  try {
    const { datasetName } = req.body;
    const userId = req.user.id;
    const fileType = req.files[0].mimetype; // Get the file type of the first uploaded file
    const filePaths = req.files.map(file => file.path); // Get file paths returned by multer after upload

    const dataset = await Dataset.create({ datasetName, fileType, filePaths, userId });
    res.status(201).json({
      message: 'Dataset uploaded successfully!',
      dataset: dataset
    });
    console.log('Dataset uploaded successfully!');
  } catch (error) {
    console.error(error);
    // If processUpload fails, delete the uploaded files
    if (req.uploadedFiles && req.uploadedFiles.length > 0) {
      req.uploadedFiles.forEach(filePath => {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting file: ${filePath}`, err);
          } else {
            console.log(`File deleted successfully: ${filePath}`);
          }
        });
      });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const searchDataset = async (req, res) => {
  try {
    const { term } = req.query; // Get the search term from query parameters
    const searchResults = await Dataset.findAll({ where: { datasetName: { [Op.iLike]: `%${term}%` } } });
    res.json({ searchResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// export const downloadDataset = async (req, res) => {
//   try {
//     const { datasetId } = req.params; // Assuming datasetId is included in the request parameters
//     const dataset = await Dataset.findByPk(datasetId);

//     if (!dataset) {
//       return res.status(404).json({ error: 'Dataset not found' });
//     }

//     const datasetPath = dataset.filePaths; // Assuming the file path is stored in the 'filePath' field of the Dataset model
//     res.download(datasetPath, 'dataset_file_name.csv'); // Specify the desired file name for download
//   } catch (error) {
//     console.error(error); // Log the error for debugging purposes
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

export const downloadDataset = async (req, res) => {
  try {
    const { datasetId } = req.params;
    const dataset = await Dataset.findByPk(datasetId);

    if (!dataset) {
      return res.status(404).json({ error: 'Dataset not found' });
    }

    const datasetPaths = dataset.filePaths; // Assuming datasetPaths is an array of file paths
    const zipFileName = 'dataset_files.zip';
    const zipFilePath = path.join(__dirname, zipFileName); // Specify the path where the zip file will be saved

    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Set compression level (optional)
    });

    output.on('close', () => {
      res.download(zipFilePath, zipFileName); // Send the zip file for download
      fs.unlinkSync(zipFilePath); // Delete the zip file after download
    });

    archive.on('error', (err) => {
      throw err;
    });

    archive.pipe(output);

    // Add files to the zip archive
    datasetPaths.forEach((filePath) => {
      const fileName = path.basename(filePath);
      archive.file(filePath, { name: fileName });
    });

    archive.finalize();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
