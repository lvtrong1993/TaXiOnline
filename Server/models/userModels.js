var mysql = require('mysql'),
q = require('q');
db = require('../fn/mysql-db');

var d = q.defer();

var userModel= {
  
    checkLogin: function(userName, passWord){
        var  sql = 'select u.*  from nhanvien u where u.tendangnhap = "'+userName+'" and  u.matkhau = "' + passWord+'"';
        return db.load(sql);
    },
    checkExitsUser: function(userName, passWord, type){
       // var  sql = 'select count(*) as soluong  from nhanvien  where tendangnhap = "'+userName+'" and  matkhau = "' + passWord+'" and loainv = '+type;
         var  sql = 'select manv as soluong  from nhanvien  where tendangnhap = "'+userName+'" and  matkhau = "' + passWord+'" and loainv = '+type;

        console.log(sql);
        return db.load(sql);
    },
    getDriverIdByUs: function(userName){
        var  sql = 'select x.manv from nhanvien x where x.tendangnhap =  "'+userName+'"';
        console.log(sql);
        return db.load(sql);
    },
    getDriverUsById: function(idtx){
        var  sql = 'select x.* from nhanvien x where x.manv =  "'+idtx+'"';
        console.log(sql);
        return db.load(sql);
    }
 }
module.exports = userModel;