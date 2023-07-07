// var mysql=require('mysql');
// var http = require('http');
// const express = require('express');
// const app = express()
// const post = 4000
// const db=mysql.createConnection({
//   host:'localhost',
//   user:'root',
//   password:'',
//   database:'example',
// })
// db.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.get('/totalitems',(req,res) => {
// 	var sql = "SELECT *FROM `sanpham`" ;
  
// 	db.query(sql,function (error,result){
// 		if (error) throw error;
// 		res.json(result);
// 		console.log(result);
// 	});
   
   
// })
// // phan trang
// app.get('/danhmuc/:page',(req,res) => {
// 	var limit = 5;
// 	var ofsset = (req.params.page -1) * limit;
// 	var sql = "SELECT ID,tensp FROM `sanpham`ORDER BY `ID` DESC LIMIT "+ofsset+","+limit;
		
// 	db.query(sql,function(error,result){
// 		if(error) throw error;
// 		console.log("get from db");
// 		res.json(result);
// 	});
// })
// app.listen(post, () => {
//   console.log(`Example app listening on port ${post}`)
// })


///------------demo2--------------------///
var http = require('http');
const express=require('express');
const app= express();



//settings
app.set('port',process.env.PORT || 3000);

//MIDDLEWARE
app.use(express.json());
//Router
app.use(require('./src/router/product'))
//

app.listen(app.get('port'),()=>{
    console.log('listening on port',app.get('port'));
})