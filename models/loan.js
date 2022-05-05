const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const Loan = sequelize.define('loan',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }
});

module.exports=Loan;