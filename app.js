const path = require('path');

const express = require('express');

const sequelize=require('./util/database');

const User=require('./models/user');
const Book=require('./models/book');
const Cart=require('./models/cart');
const CartItem=require('./models/cartItem');
const Loan=require('./models/loan');
const LoanItem=require('./models/loadItem');

const adminRoutes=require('./routes/admin');
const libraryRoutes=require('./routes/library');

const errorController=require('./controllers/error');

const app=express();

app.set('view engine','ejs');
app.set('views','views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminRoutes);
app.use(libraryRoutes);
app.use(errorController.getError);

Book.belongsTo(User,{constraints:true,onDelete:'CASCADE'});

User.hasMany(Book);

sequelize
    .sync({force:true}) 
    // .sync()
    .then(result=>{
        console.log('Connection successful');
        app.listen(3000);
    })
    .catch(err=>{
        console.log(err);
    })