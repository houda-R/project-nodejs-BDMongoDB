const express=require('express');
const { default: mongoose } = require('mongoose');
const Schema =mongoose.Schema
const customerSchema =new Schema({
firstName:String,
lastName:String,
email:String,
telephone:String,
age:String,
country:String,
gender:String,
},
{timestamps:true});
const customer=mongoose.model('customer',customerSchema);
module.exports=customer;