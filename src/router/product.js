const Router=require('express');
var cacheService = require('express-api-cache')
var cache = cacheService.cache;
/*
sử dung thư viện exprees-api-cache để tăng tốc độ truy cập 
sử dụng bộ nhớ đệm từ server express 
valid units - ms, second, minute, hour, day, week, month.
duration format - [time][unit] as 5 minutes
*/


const router=Router();
var port=3000;
const mysqlConnection=require('../database/database')
router.get('/',(req,res)=>{
    res.status(200).json(`server on port ${port} and database is connected`);
    res.send("hello");
});
//total product
router.get('/totalitem',cache("10 minutes"),(req,res)=>{
     // Do some work to retrieve movies and request before 10 minutes will get movies from cache
    var sql="SELECT * FROM sanpham" ;
    const d = new Date();
    let seconds1 = d.getSeconds();
    mysqlConnection.query(sql,(error,result)=>{
        if (!error){
            res.json(result);
        }else{
            throw error;
        }
    });
    let seconds2 = d.getSeconds();
    console.log(seconds2-seconds1);
    
})
//get product from id 
router.get('/idsp/:id',(req,res)=>{
 
    var {id}=req.params;
    var sql="SELECT *FROM `sanpham` WHERE id=?";
    mysqlConnection.query(sql,[id],(error,result)=>{
        if (!error){
            res.json(result);
        }else{
            console.log(error);
        }
    })

})
///them san pham
router.post('/themsp/',(req,res)=>{
    const{tensp,gia,mieuta}=req.body;
    console.log(req.body);
    var sql="INSERT INTO `sanpham`(`tensp`, `gia`, `mieuta`) VALUES (?,?,?)";
    mysqlConnection.query(sql,[tensp,gia,mieuta],(error,result)=>{
        if(!error){
            res.json({statusbar:'add product succed',})
        }else{
            console.log(error);
        }
    })

});
//udate
router.put('/update/:id',(req,res)=>{
    const{id,tensp,gia,mieuta}=req.body;
    console.log(req.body);
    var sql="UPDATE `sanpham` SET `tensp`=?,`gia`=?,`mieuta`=? WHERE id=?";
    mysqlConnection.query(sql,[tensp,gia,mieuta,id],(error,result,fields)=>{
        if(!error){
            res.json({statusbar:'update product succed',})
        }else{
            console.log(error);
        }
    })
    });
//delete
router.delete('/delete/:id',(req,res)=>{
    const [id]=req.params;
    var sql="DELETE FROM `sanpham` WHERE id=?"
    mysqlConnection.query(sql,[id],(error,result,fields)=>{
        if(!error){
            res.json({statusbar:'user delete'})
        }else{
            res.json({statusbar:error})
        }
    });
});
 // phan trang
router.get('/danhmuc/',(req,res) => {
	var limit = 5;
	var ofsset = (req.query.page -1) * limit;
	var sql = "SELECT * FROM `sanpham`ORDER BY `ID` DESC LIMIT "+ofsset+","+limit;
		
	mysqlConnection.query(sql,function(error,result){
		if(error) throw error;
		console.log("phantrang db");
		res.json(result);
	});
})

module.exports=router;