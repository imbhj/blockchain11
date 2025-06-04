const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Counter = sequelize.define('Counter', {
    value: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
});

module.exports = Counter; 