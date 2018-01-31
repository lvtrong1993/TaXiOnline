var mysql = require('mysql'),
q = require('q');
db = require('../fn/mysql-db');

var d = q.defer();

var userModel= {
  
    getListDiemByKH: function(sdt){
        var  sql = 'select d.*, k.*  from diem d, khachhang k where d.sdtkh = k.sdt and d.sdtkh = "'+sdt+'"';
        console.log(sql);
        return db.load(sql);
    },
    checkDiemExists: function(sdt, viTri){
        var  sql = 'select d.* from diem d where d.sdtkh = "'+sdt+'" and d.vitrisaudinhvi = "'+viTri+'"';
        console.log(sql);
        return db.load(sql);
    }, 
    addDiem: function(newDiem){
        var  sql = `INSERT INTO diem(madiem, kinhdo, vido, sdtkh, tinhtrang, solandinhvi, vitritruocdinhvi, vitrisaudinhvi, loaixe, thoigiandat, ghichu)
         VALUES (null, 0, 0, '${newDiem.sdtKH}', 0, 0, '${newDiem.viTri}', '', '${newDiem.loaiXE}', '${newDiem.thoiGianDat}', '${newDiem.ghiChu}')`;
        console.log(sql);
        return db.load(sql);
    },
    updateThongTinDiem: function(sdt, tinhTrang, maTaiXe){
        var sql;
        if(maTaiXe != null){
            sql = `UPDATE diem SET tinhtrang = ${tinhTrang}, mataixe = ${maTaiXe} Where sdtkh = ${sdt} and tinhtrang = 1`;
        }else{
            sql = `UPDATE diem SET tinhtrang = ${tinhTrang} Where sdtkh = ${sdt} and tinhtrang = 3`;
            
        }
        console.log(sql);
        return db.load(sql);
    },
    updateThongTinDiem2: function(sdt, tinhTrang, maTaiXe){
        var sql;
        if(maTaiXe != null){
            sql = `UPDATE diem SET tinhtrang = ${tinhTrang}, mataixe = ${maTaiXe} Where sdtkh = ${sdt}`;
        }else{
            sql = `UPDATE diem SET tinhtrang = ${tinhTrang} Where sdtkh = ${sdt}`;
            
        }
        console.log(sql);
        return db.load(sql);
    },
    getAllDiem: function(){
        var  sql = 'select d.*  from diem d order by d.thoigiandat desc';
        console.log(sql);
        return db.load(sql);
    },
    getDiemByInforFromClient: function(sdtkh, vitri){
        var  sql = 'select d.* from diem d where d.sdtkh = "'+sdtkh+'" and d.vitritruocdinhvi = "'+vitri+'"';
        console.log(sql);
        return db.load(sql);
    },
    getListDiemChuaDinhVi: function(){
        var  sql = 'select d.*  from diem d where d.tinhtrang = 0';
        console.log(sql);
        return db.load(sql);
    },
    dinhViDiemThanhCong(maDD, kinhDo, viDo){
        //UPDATE diem SET kinhdo = 10.7798528, vido = 106.69898650000005 Where madiem = 4
        var sql = `UPDATE diem SET kinhdo = ${kinhDo}, vido = ${viDo}, tinhtrang = 1 Where madiem = ${maDD}`;
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