const express = require('express');
const app = express();
const mongoose = require('mongoose');
const customer = require("./models/customersSchema")
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
var moment = require('moment');
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

//read Data
app.get("/", (req, res) => {
    customer.find().then((data) => {
        res.render("index", { data: data, moment: moment })
    }).catch((err) => {
        console.log(err);
    })
})
//create customers
app.get("/Customers/add", (req, res) => {
    res.render("Customers/add.ejs")
})
app.post("/Customers/add", (req, res) => {
    customer.create(req.body).then(() => {
        res.redirect('/')
    }).catch((err) => {
        console.log(err)
    })
})
//show customer
app.get("/Customers/:id", (req, res) => {
    customer.findById(req.params.id).then((data) => {
        res.render("Customers/view", { data: data, moment: moment })
    }).catch((err) => {
        console.log(err);
    })
})

//update customer
app.get("/Customers/edit/:id", (req, res) => {
    customer.findById(req.params.id).then((data) => {
        res.render("Customers/edit.ejs", { data: data, moment: moment })
    }).catch((err) => {
        console.log(err);
    })
})
app.put("/Customers/edit/:id", (req, res) => {
    customer.updateOne({ _id: req.params.id }, req.body).then(() => {
        res.redirect('/')
    }).catch((err) => {
        console.log(err)
    })
})
//delete customer

app.delete("/Customers/delete/:id", (req, res) => {
    customer.deleteOne({ _id: req.params.id }).then(() => {
        res.redirect('/')
    }).catch((err) => {
        console.log(err)
    })
})
//search customers
app.post("/search", (req, res) => {
    customer.find({ firstName: req.body.search }).then((resultSearch) => {
        res.render("Customers/search", { resultSearch: resultSearch })
    }).catch((err) => {
        console.log(err)
    })
})
//connection with BD
mongoose.connect("link to connect with BD mongoDB")
    .then(() => {
        console.log('Connected to MongoDB');

    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error)
    })
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
