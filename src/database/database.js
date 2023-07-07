const mysql=require('mysql');
var http = require('http');
const mysqlConnection=mysql.createConnection({
    host:'localhost',
   user:'root',
   password:'',
   database:'example',
})
mysqlConnection.connect({
    function (error) {
        if (error) {
            console.log(error)
            return;
        }
        else{
            console.log('mysql connection')
        }
    }
})
module.exports=mysqlConnection;