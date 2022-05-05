const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const LoadItem = sequelize.define('loanItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER
});

module.exports = LoadItem;