const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const {endpoint}=require('../config');
const {db}=require("../database")
const demoRoute=require('../src/routes/demo_route');

module.exports=()=>{
    db;
    const app=express();
    app.use(cors());
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());
    app.use((error,request,response,next)=>{
        if (error!== null){
            return response.json({status:401,message:"Invalid json",error:error})
        }
        next();
    });
    app.use(endpoint,demoRoute)
    return app;
}

