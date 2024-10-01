import express from "express";
const router=express.Router();
import userrouter from "../controllers/usercontroller.js";
import connection from "../config/db.js";
const {enteruser,upload,getuserbyid}=userrouter;

router.post("/enterprofile",upload.single("myimg"),(req,res)=>{
const imgpath=req.file.path;
const userid=parseInt(req.body.userid);
connection.query(`insert into profile set firstname=?, lastname=?, image=?,userid=?`,[req.body.firstname,req.body.lastname,imgpath,userid],(err,results)=>{
    if(err){res.send(err)}
    else{res.send(results)}
});
});
router.post("/enteruser",enteruser);
router.get("/getuserbyid/:id",getuserbyid);
export default router;