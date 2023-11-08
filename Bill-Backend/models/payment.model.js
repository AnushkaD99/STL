import { DataTypes } from 'sequelize';
import sequelize from './index.js'; // Make sure to import sequelize instance from your models

const Payments = sequelize.define('Payments', {
  payment: {
    type: DataTypes.FLOAT, // Using ARRAY to store multiple file paths
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER, // Assuming userId is an integer
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  }
});

export default Payments;
