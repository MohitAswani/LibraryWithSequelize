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

app.use((req,res,next)=>{
    User.findByPk(1)
        .then(user=>{
            req.user=user;
            next();
        })
        .catch(err=>{
            console.log(err);
        })
});

app.use('/admin',adminRoutes);
app.use(libraryRoutes);
app.use(errorController.getError);

Book.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Book);

User.hasOne(Cart);
Cart.belongsToMany(Book,{through:CartItem});

Loan.belongsTo(User);
User.hasMany(Loan);
Loan.belongsToMany(Book,{through:LoanItem});

let fetchedUser;
sequelize
    // .sync({force:true}) 
    .sync()
    .then(result=>{
        return User.findByPk(1);
    })
    .then(user=>{
        if(!user){
            return User.create({name:'Mohit',email:'aswanim96@gmail.com'})
        }
        return Promise.resolve(user);
    })
    .then(user=>{
        fetchedUser=user;
        return Cart.findAll({where:{userId:user.id}});
    })
    .then(carts=>{
        if(!carts[0])
        {
            return fetchedUser.createCart();
        }

        return Promise.resolve(carts[0]);
    })
    .then(cart=>{
        console.log('Connection successful');
        app.listen(3000);
    })
    .catch(err=>{
        console.log(err);
    })