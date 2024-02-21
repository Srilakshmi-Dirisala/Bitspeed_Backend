const express=require('express');
const {identifyController,addUsersController}=require("../controllers/demo_controller");
var router=express.Router();

router.post('/identify',identifyController)

router.post('/addUsers',addUsersController)

module.exports=router