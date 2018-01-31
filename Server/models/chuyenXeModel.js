var mysql = require('mysql'),
q = require('q');
db = require('../fn/mysql-db');

var d = q.defer();

var chuyenXeModel= {
  
    // lấy danh sách Xe đang rảnh theo mã loại xe
    getListDriverFree: function(loaiXe){
        var  sql = 'select x.*  from chuyenxe x where x.loaixe =  "'+loaiXe+'"';
        console.log(sql);
        return db.load(sql);
    },

  
   
    
 }
module.exports = chuyenXeModel;
/*
SELECT COUNT(column_name)
FROM table_name
WHERE condition;
*/