import { DataTypes } from 'sequelize';
import sequelize from './index.js'; // Make sure to import sequelize instance from your models

const Billing = sequelize.define('Billing', {
  userId: {
    type: DataTypes.INTEGER, // Assuming userId is an integer
    allowNull: false
  },
  Outstanding: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  BillValue: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  payment: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  }
});

export default Billing;
