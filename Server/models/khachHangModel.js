var mysql = require('mysql'),
q = require('q');
db = require('../fn/mysql-db');

var d = q.defer();

var userModel= {
  
    checkExistCustomer: function(sdt){
        var  sql = 'select k.*  from khachhang k where k.sdt = "'+sdt+'"';
        console.log(sql);
        return db.load(sql);
    }, 
    addCustomer : function(sdt, tenKH){
        var  sql = 'insert into khachhang(sdt, tenkh) values("'+sdt+'", "'+tenKH+'")';
        console.log(sql);
        return db.load(sql);
    }
 }
module.exports = userModel;
/*
SELECT COUNT(column_name)
FROM table_name
WHERE condition;
*/