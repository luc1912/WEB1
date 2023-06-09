const express = require('express');
const session = require('express-session');
const path = require('path');

const homepg = require('./routes/home.routes');
const cartpg = require('./routes/cart.routes');

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use(session({
    secret: 'tajna',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 900000 // sjednica traje 15 minuta u milisekundama
    }
}));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname, 'public')));

app.use('/home', homepg);
app.use('/cart', cartpg);

//app.use("/home/", (req, res) => res.redirect("/home"));
    app.use("/", (req, res) => res.redirect("/home"));


app.listen(3000);



