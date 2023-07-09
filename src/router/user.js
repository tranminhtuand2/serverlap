const Router=require('express');
const router=Router();
var dbuser=require('../database/database');

//dangky user
router.post('/dangky/',(req, res) => {
    const{name,password,sdt,type}=req.body;
    console.log(req.body);
    var sql='INSERT INTO `user`(`name`, `password`, `sdt`, `type`) VALUES (?, ?, ?,?)';
    dbuser.query(sql,[name,password,sdt,type],function(err,result){
        if(!err){
            res.json({statusbar:'register succes',})
        }else{
            console.log(err);
        }
    })
},);
router.post('/dangnhap/',(req, res)=>{
    const {name,password}=req.body;
    console.log(req.body);
    var sql='SELECT * FROM `user` WHERE name=? AND password=?';
    dbuser.query(sql,[name,password],function(err,result){
        if(!err){
            if(result.length>0){ res.json({statusbar:' succes',result})}
            else{
                res.json({statusbar:' empty',})
            }
           
        }else{
            console.log(err);
        }
    });
});
module.exports=router;

