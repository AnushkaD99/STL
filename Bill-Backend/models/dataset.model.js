import { DataTypes } from 'sequelize';
import sequelize from './index.js'; // Make sure to import sequelize instance from your models

const Dataset = sequelize.define('Dataset', {
  datasetName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fileType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  filePaths: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Using ARRAY to store multiple file paths
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER, // Assuming userId is an integer
    allowNull: false
  },
  uploadDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  }
});

export default Dataset;
