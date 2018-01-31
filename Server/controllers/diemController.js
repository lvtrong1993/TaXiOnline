var cloudinary = require('cloudinary');
//     async = require('async');

cloudinary.config({
	cloud_name: 'dxnapa5zf',
	api_key: '219348637198157',
	api_secret: 'FJl9rCE5dTS_kgkX_rPvUyMTwZY'
});

var q = require('q');
var d = q.defer();
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry">

//var p = new Promise();
// function distanceFromLatLon(lat1,lon1,lat2,lon2) {
//     var R = 6371; // Radius of the earth in km
//     var dLat = (lat2-lat1) * (Math.PI/180);  // deg2rad below
//     var dLon = (lon2-lon1)* (Math.PI/180); 
//     var a = 
//       Math.sin(dLat/2) * Math.sin(dLat/2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
//       Math.sin(dLon/2) * Math.sin(dLon/2)
//       ; 
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//     var ds = R * c; // Distance in km
//     return ds;
//   }
  function distanceFromLatLon(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
//   function getMinElementArray(arr){
//     var minE= arr[0];
//     for(var c= 1; c< arr.length; c++){
        
//     }
//   }
var diemController = function(diemModel){  

    var hihi =function distanceFromLatLon1(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = (lat2-lat1) * (Math.PI/180);  // deg2rad below
        var dLon = (lon2-lon1)* (Math.PI/180); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var ds = R * c; // Distance in km
        return ds;
      }
    var getArrXeGanDiem=function getArrXeGanDiem(diemKhach, listXe, l){
        var arrXe = [];
        if(l<11){
            for(var i =0; i<l; i++){
                arrXe.push(listXe[i]);
            }
        }else{
            for(var j =0; j<10; j++){
                arrXe.push(listXe[j]);
            }
            for(var k=10; k< listXe.length; k++){
                var flagCheck =false;
                for(var x=0; x<arrXe.length; x++){
                    var dist1 = distanceFromLatLon(diemKhach.kinhdo, diemKhach.vido, listXe[k].kinhdo, listXe[k].vido);
                   
                    var dist2 = distanceFromLatLon(diemKhach.kinhdo, diemKhach.vido, arrXe[x].kinhdo, arrXe[x].vido);
                    if(dist1 < dist2){
                       arrXe[x] =  listXe[k];
                      break;
                    }
                }
            }
        }
        return arrXe;
    }
     var getAllDiem =function(){
         return diemModel.getAllDiem();
     }
 

    // tính các xe gần nhất end
    var getListDiemByKH = function(makh){
       return diemModel.getListDiemByKH(makh);
    }
   

    var checkDiemExists = function(sdt, viTri){
        return diemModel.checkDiemExists(sdt, viTri);
     }

     var addDiem = function(newDiem){

        return diemModel.addDiem(newDiem);
     }

     var getListDiemChuaDinhVi = function(){
            console.log("Dang goi ham get diem chua dinh vi");
            return diemModel.getListDiemChuaDinhVi();
        }
    var dinhViDiemThanhCong = function(diem){
        const maDD= diem.madiem;
        const kinhDo = diem.kinhdo;
        const viDo =diem.vido;
        return diemModel.dinhViDiemThanhCong(maDD, kinhDo, viDo);
    }

    var updateThongTinDiem = function(sdt, tinhTrang, maTaiXe){
        console.log("dang goi ham update thong tin diem");
        return diemModel.updateThongTinDiem(sdt, tinhTrang, maTaiXe);
    }
    var updateThongTinDiem2 = function(sdt, tinhTrang, maTaiXe){
        console.log("dang goi ham update thong tin diem");
        return diemModel.updateThongTinDiem2(sdt, tinhTrang, maTaiXe);
    }

    var goiXe =  function(data, locationXe){
        if(locationXe.length >0)
        {
            console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
            console.log(data);
            console.log(locationXe);
            var lol;
            var minDis = Number.MAX_VALUE;
            var indexMinDis = -1;
            for(var t=0; t<locationXe.length; t++){
               if(locationXe[t].tinhTrang ==0)
               {
                var tmpDis = distanceFromLatLon(data.kinhdo, data.vido, locationXe[t].lat, locationXe[t].lng);
                console.log(tmpDis);
                console.log(minDis);
                if(tmpDis < minDis){
                    console.log("Doi min");
                    minDis=tmpDis;
                    indexMinDis =t;
                }
            }
            }
            console.log(locationXe[indexMinDis]);
            lol = locationXe[indexMinDis];
          //  return locationXe[indexMinDis];
        }
        return lol;
    }

    var getDiemByInforFromClient = function(dataFromClient){
        var sdtkhach = dataFromClient.sdtKH;
        var vitrikhach = dataFromClient.viTri;
      //  console.log("dang goi ham update thong tin diem");
        return diemModel.getDiemByInforFromClient(sdtkhach, vitrikhach);
    }
//getDiemByInforFromClient
    
    var goiXeSauTuChoi =  function(data, locationXe, idXeTC){
        if(locationXe.length >0)
        {
           // console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
            console.log(data);
            console.log(locationXe);
            var rs =null;
            var minDis1 = Number.MAX_VALUE;
            var indexMinDis1 = -1;
            for(var tt=0; tt<locationXe.length; tt++){
                console.log("llll"+locationXe[tt])
                console.log("llll socket truyen vao"+idXeTC);
                //&& locationXe[t].id != idXeTC
               if(locationXe[tt].tinhTrang ==0 && locationXe[tt].id != idXeTC)
               {
                   console.log(locationXe);
                var tmpDis1 = distanceFromLatLon(data.lat, data.lng, locationXe[tt].lat, locationXe[tt].lng);
                console.log("khoang cach"+tmpDis1);
                console.log("min khoang cach"+minDis1);
                if(tmpDis1 < minDis1){
                    console.log("Doi min");
                    minDis1=tmpDis1;
                    indexMinDis1 =tt;
                }
            }
            }
            console.log(locationXe[indexMinDis1]);
            rs = locationXe[indexMinDis1];
          //  return locationXe[indexMinDis];
        }
        return rs;
    }
     return {
         getListDiemByKH:getListDiemByKH,
         checkDiemExists:checkDiemExists,
         addDiem:addDiem,
         getListDiemChuaDinhVi:getListDiemChuaDinhVi,
         dinhViDiemThanhCong: dinhViDiemThanhCong,
        // distanceFromLatLon : distanceFromLatLon,
         getArrXeGanDiem:getArrXeGanDiem,
         hihi:hihi,
         goiXe: goiXe,
         updateThongTinDiem: updateThongTinDiem,
         updateThongTinDiem2: updateThongTinDiem2,
         goiXeSauTuChoi: goiXeSauTuChoi,
         getAllDiem: getAllDiem,
         getDiemByInforFromClient: getDiemByInforFromClient
     }



}
module.exports = diemController;


