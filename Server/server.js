var express = require('express');
var bodyparser = require('body-parser');
var jwt = require('jsonwebtoken');
var path = require('path');
var expressValidator = require('express-validator');

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator()); // Add this after the bodyParser middlewares!
var server =require("http").Server(app);
var io= require("socket.io")(server);
//port 
var port = process.env.PORT || 5001;
//For model
var userModel = require('./models/userModels');
var khachHangModel = require('./models/khachHangModel');
var diemModel = require('./models/diemModel');
var chuyenXeModel = require('./models/chuyenXeModel');
//For Controller
var userController = require('./controllers/userControllers')(userModel);
var khachHangController = require('./controllers/khachHangController')(khachHangModel);
var diemController = require('./controllers/diemController')(diemModel);
var chuyenXeController = require('./controllers/chuyenXeController')(chuyenXeModel);



/*app.use('/api', function(req, res, next){
  var auth = req.headers["authorization"];
  if (auth)
  {
      var token = auth.split(' ')[1];

      jwt.verify(token, 'khintmam', {algorithm: 'HS256'}, function(err, verified){
		    if (err){
              //of V
              //req.auth = undefined;
              //next();
              //end of V
              //of C
              return res.status(404).json("Failed to authenticate token");  
          }
          else
          {

            //Xac dinh lai authorixation lai cho nay. cach flow for authorization
              //userModel.getUserDetail( req.auth.username)
              userModel.getUserDetail(49)
              .then(function (user) {
                  if(user.length == 0){
                    res.status(404).json({lstErr: ['User name cung cấp không tồn tại']});
                  }else{
                    req.auth = user;
                    next();
                  }
              })
              .catch(function (error) {
                  res.status(404).json({lstErr: ['Có lỗi trong quá trình xử lý']});
              })

          }
	  });
          
          
  }
  
  else {
      //req.auth = undefined;
      next();
      //for test api
      //true: 
      //return res.status(403).send("No token provided");
  }
  
});*/
var locationXe =[];

server.listen(port, function(){
  console.log('The server is listening on PORT: ' + port);
});

io.on("connection", function(socket){
  var s= this;
  console.log("co ng ket noi"+socket.id);
  //io.emit('attantion');Client-check-login
  socket.on("Client-check-login", function(data){
    var obj = JSON.parse(data);
    console.log("Data from client "+obj.userName);//+JSON.stringify(data, null, 4)
   
    // userController.checkLogin(obj.userName, obj.Password);
    var us= obj.userName;
    var pwd= obj.Password

      //userModel.checkLogin(us, pwd)
      userController.checkLogin(us, pwd)
      .then(function (result) {
          if(result.length<1){
              console.log("Không tồn tại user");
              var rsLogin = {"result" : false};
              io.sockets.emit("Server-check-login",rsLogin);
          }else{
              console.log("Có tồn tại user - legth:"+result.length);
              var rsLogin = {"result" : true,
                            "maNV": result[0].manv,
                            "tenNV": result[0].tennv,
                            "loaiNV": result[0].loainv
                            };
              console.log(rsLogin);
              io.sockets.emit("Server-check-login",rsLogin);
          }
      })
      .catch(function (error) {
          console.log(error);
          var rsLogin = {"result" : false};
          io.sockets.emit("Server-check-login",rsLogin);
      })   
  });

  // kiểm tra tồn tại khách hàng
  
  socket.on("Client-check-exits-customer", function(data){
  //  var obj = JSON.parse(data);
  console.log("kt so dien thoai kh"+ data);
    khachHangController.checkExistCustomer(data)
    .then(function (result) {
    //  console.log("dd"+result.length);
        if(result<1){
            console.log("Không tồn tại user");
        }else{
            console.log("có tồn tại user"+JSON.stringify(result));
         //   var objKH= JSON.parse(result)
         console.log(result[0]);
            diemController.getListDiemByKH(result[0].sdt)
            .then(function (result2) {
              if(result2.length<1){
                console.log("k co diem");
              }else{
                // for( d=0; d<result2.length; d++){
                //   result2.length[d].thoigiandat= result2.length[d].thoigiandat.toString();
                // }
                console.log(result2);
                io.sockets.emit("Server-send-list-diem",result2);
              }
            });
        }
    })
    .catch(function (error) {
        console.log(error);
    })
  });
  socket.on("Client-send-Diem-info", function(data){
     var obj = JSON.parse(data);
    console.log("Đã nhận điểm"+data);
       khachHangController.checkExistCustomer(obj.sdtKH)
       .then(function (result) {
          if(result<1){
            // khách hàng chưa tồn tại trong hệ thống, cần thêm mới khách hàng
              console.log("Không tại user co sdt "+ obj.sdtKH);
              khachHangController.addCustomer(obj)
              .then(function (result){
                console.log("Thêm khách hàng "+ obj.sdtKH +" thành công");
                diemController.addDiem(obj)
                .then(function (rs){
                  console.log("them moi diem thanh cong123");
                  //Update điểm chua dịnh vị tới các app con
                  diemController.getListDiemChuaDinhVi()
                  diemController.getListDiemChuaDinhVi()
                  .then(function (result2345) {
                   
                    // if(result234.length<1){
                    //   console.log("k co diem");
                    // }else
                    {
                      // for( d=0; d<result2.length; d++){
                      //   result2.length[d].thoigiandat= result2.length[d].thoigiandat.toString();
                      // }
                      // console.log(result2);
                      console.log("lay d r ");
                      io.sockets.emit("Server-send-list-diem-chua-dinh-vi",result2345);
                    }
                  });


                  ////
                })
                .catch .then(function (resultDiem){
                  console.log("them moi diem that bai");
                })
              })
              .catch(function (result){
                console.log("Thêm khách hàng thất bại");
              })
          }else{
              console.log("có tồn tại user"+JSON.stringify(result));
              console.log(result[0]);
              diemController.checkDiemExists(obj.sdtKH, obj.viTri)
           
              // check đã tồn tại điểm đã định vị chưa, nếu rồi tự động điều xe
              // nếu chưa chuyển thông tin sang áp định vị
           //  diemController.getListDiemByKH(result[0].makh)
              .then(function (resultDiem) {
                if(resultDiem.length<1){
                  console.log("k co diem tuong ung voi khach hang");
                  // thêm mới điểm
                  diemController.addDiem(obj)
                  .then(function (rs){
                    console.log("them moi diem thanh cong khach hang cu");
                    // cập nhật lại thông tin điểm chưa định vị cho các app con
                    diemController.getListDiemChuaDinhVi()
                    .then(function (result234) {
                     
                      if(result234.length<1){
                        console.log("k co diem");
                      }else{
                        // for( d=0; d<result2.length; d++){
                        //   result2.length[d].thoigiandat= result2.length[d].thoigiandat.toString();
                        // }
                        // console.log(result2);
                        console.log("lay d r ");
                        io.sockets.emit("Server-send-list-diem-chua-dinh-vi",result234);
                      }
                    });
                    
                  })
                  .catch .then(function (resultDiem){
                    console.log("them moi diem that bai");
                  })

                }else{
                  console.log("Có   diem tuong ung voi khach hang");
                  //gọi hàm đặt xe
                }
              });
          }
       })
      .catch(function (error) {
          console.log(error);
      })
    });

  socket.on("Client-send-data", function(data){
    var obj = JSON.parse(data);
    console.log("Data from client "+obj.userName);//+JSON.stringify(data, null, 4)
    io.sockets.emit("Server-send-data","da nhan dc data");
  });

  socket.on("testDatLoun", function(data1){
  console.log("xuat ttin ne");
   console.log( data1);
   var myobj = JSON.parse(data1);
   console.log(myobj);
   diemController.getDiemByInforFromClient(myobj)
   .then(function(datars){
     console.log("Diem tim thay en");
     console.log(datars[0].madiem);
     var goiXe2= diemController.goiXe(datars[0], locationXe);
     
     io.to(goiXe2.id).emit('yeuCauXe2', datars[0]);

     //cập nhật thông tin về app quản lý điểm
     diemController.getAllDiem()
     .then(function(listAll){
       io.sockets.emit("Server-send-full-list",listAll);
     });
   });
  
  });


  // App dịnh vị điểm START
  socket.on("addcc", function(){
    
    console.log("okkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk123");
    io.sockets.emit("tradulieu","hihi");
  });
  socket.on("test1", function(){
    
    console.log("nghe dc test1");
    io.sockets.emit("test2","hihi");
  });
  socket.on("listDiemChuaDinhVi", function(){
    
    console.log("Yêu cầu danh sách điểm chau định vị nè");
    
    diemController.getListDiemChuaDinhVi()
    .then(function (result2) {
      if(result2.length<1){
        console.log("k co diem");
      }else{
        // for( d=0; d<result2.length; d++){
        //   result2.length[d].thoigiandat= result2.length[d].thoigiandat.toString();
        // }
        console.log(result2);
        io.sockets.emit("Server-send-list-diem-chua-dinh-vi",result2);
      }
    });
  });
  socket.on("testLoginDV", function(dt){
    var usDV = dt.username;
    var pwdDV = dt.password;
    userController.checkExitsUser(usDV, pwdDV, 2)
    .then(function(d){
      console.log(d[0].soluong);
      io.sockets.emit("Server-send-ket-qua-dang-nhap-app-dinhvi",d[0].soluong);
    })
    .catch(function(){
      console.log("login that bai");
      io.sockets.emit("Server-send-ket-qua-dang-nhap-app-dinhvi",0);
    });
   
   
    
  
  });
  // testLoginDV
  // APP QUẢN LÝ ĐIỂM START
//listDiemChuaDinhVi
  socket.on("fullListDiem", function(){
    
    console.log("YÊU CAU FULL DIEM");
    diemController.getAllDiem()
    .then(function(listAll){
      io.sockets.emit("Server-send-full-list",listAll);
    });
  });

  // lấy thông tin tài xế cho khách đang đi xe của tài xế này
  socket.on("getInforTXById", function(idTX){
    
    console.log("YÊU CAU thong tin tai xe");
    userController.getDriverUsById(idTX)
    .then(function(ttTaiXe){
      console.log(ttTaiXe );
      for(var dem =0; dem < locationXe.length; dem++)
      {
        console.log(locationXe[dem].username );
        if(locationXe[dem].username == ttTaiXe[0].tendangnhap){
          console.log("tim thay thong tin tai xe ");
         var ttTXTraVe1 = Object.assign(locationXe[dem], ttTaiXe[0]);
        console.log(ttTXTraVe1);
        io.sockets.emit("Server-send-driver-infor",ttTXTraVe1);

            

        }
      }
      // console.log("user txe ne ");
      // console.log(ustx);
     // io.sockets.emit("Server-send-full-list",listAll);
    });
  });

  // APP QUẢN LÝ ĐIỂM END
  //APP TÀI XẾ START
  socket.on("testLoginTX", function(dt){
    var usDV = dt.username;
    var pwdDV = dt.password;
    userController.checkExitsUser(usDV, pwdDV,3)
    .then(function(d){
      console.log(d[0].soluong);
      console.log("Tai xe ne "+ socket.id);
      var locationX = {username: usDV, id: socket.id, lat: 0, lng: 0, tinhTrang: 0};
      var checkTX =false;
      for(var x =0; x< locationXe.length; x++){
        if(locationXe[x].username === usDV)
        {
          checkTX=true
          locationXe[x].id = socket.id;
        }
      }
      if(checkTX ==false){
        locationXe.push(locationX);
      }
     
     // this.s.locationXe.push(locationX);
    //  console.log(locationXe);
      io.sockets.emit("Server-send-ket-qua-dang-nhap-app-dinhvi",d[0].soluong);
    })
    .catch(function(){
      console.log("login that bai");
      io.sockets.emit("Server-send-ket-qua-dang-nhap-app-dinhvi",0);
    });
   
   
    
  
  });

  // Tài xế gửi tọa độ
  // Cập nhật tọa độ tài xế trong danh sách tài xế
  socket.on("taiXeGuiToaDo", function(dt){
    //console.log(dt);
    for(var c =0; c<locationXe.length; c++){
        if(locationXe[c].id == socket.id){
          locationXe[c].lat = dt.lat;
          locationXe[c].lng = dt.lng;
        }
    }
  //  console.log(locationXe);

  });
  
  //Bắt đầu chuyến đi
  socket.on("batDauChuyenDi", function(thongtinKhachDi){
    // 1. Update trạng thái khách thành ĐANG TRONG CHUYẾN XE 
    // (duyệt qua mảng tài xế để lấy user name và gọi hàm get id tài xế) 
    //=> gọi hàm update tình trạng khách hàng (điểm)
    // 2. Update trạng thái khách thành đang trong chuyến xe
    for(var tx =0; tx< locationXe.length; tx++){
      var userNameTX ;
      if(locationXe[tx].id == socket.id){
        userNameTX = locationXe[tx].username;
        locationXe[tx].tinhTrang=1;
      }
      // gọi hàm lấy id tài xế
      //var idTaiXe= userController.getDriverIdByUs(userNameTX);
      userController.getDriverIdByUs(userNameTX)
      .then(function(idTX){
       // console.log(idTX[0].manv);
       //Gọi hàm update thông tin khách (điểm)
      // console.log(thongtinKhachDi);
       diemController.updateThongTinDiem(thongtinKhachDi.sdtkh, 3, idTX[0].manv)
       .then(function(xxx){
         //Update trạng thái tài xế thành đang trong chuyến xe
         // bắt đầu chuyến xe thành công
         diemController.getAllDiem()
         .then(function(listAll){
           io.sockets.emit("Server-send-full-list",listAll);
         });

       })
       .catch(function(){
         console.log("co loi khi bat dau chuyen di");
       });
       ;

      })
    
    }

    
   
  });

  socket.on("batDauChuyenDi2", function(thongtinKhachDi){
    // 1. Update trạng thái khách thành ĐANG TRONG CHUYẾN XE 
    // (duyệt qua mảng tài xế để lấy user name và gọi hàm get id tài xế) 
    //=> gọi hàm update tình trạng khách hàng (điểm)
    // 2. Update trạng thái khách thành đang trong chuyến xe
    for(var tx =0; tx< locationXe.length; tx++){
      var userNameTX ;
      if(locationXe[tx].id == socket.id){
        userNameTX = locationXe[tx].username;
        locationXe[tx].tinhTrang=1;
      }
      // gọi hàm lấy id tài xế
      //var idTaiXe= userController.getDriverIdByUs(userNameTX);
      userController.getDriverIdByUs(userNameTX)
      .then(function(idTX){
       // console.log(idTX[0].manv);
       //Gọi hàm update thông tin khách (điểm)
      // console.log(thongtinKhachDi);
       diemController.updateThongTinDiem2(thongtinKhachDi.sdtkh, 3, idTX[0].manv)
       .then(function(xxx){
         //Update trạng thái tài xế thành đang trong chuyến xe
         // bắt đầu chuyến xe thành công
         diemController.getAllDiem()
         .then(function(listAll){
           io.sockets.emit("Server-send-full-list",listAll);
         });

       })
       .catch(function(){
         console.log("co loi khi bat dau chuyen di");
       });
       ;

      })
    
    }

    
   
  });

  //Kết thúc chuyến đi
  socket.on("ketThucChuyenDi", function(thongtinKhachDi){
    // 1. Update trạng thái tài xế thành rảnh
    // 2. Update trạng thái khách đã đi xong
    for(var tx =0; tx< locationXe.length; tx++){
      var userNameTX ;
      if(locationXe[tx].id == socket.id){
        userNameTX = locationXe[tx].username;
        locationXe[tx].tinhTrang=1;
      }
    }
    diemController.updateThongTinDiem(thongtinKhachDi.sdtkh, 4, null)
    .then(function(xxx){
      //Update trạng thái tài xế thành đang trong chuyến xe
      // bắt đầu chuyến xe thành công
      console.log("Da ket thuc chuyen di OK");
      diemController.getAllDiem()
      .then(function(listAll){
        io.sockets.emit("Server-send-full-list",listAll);
      });

    })
    .catch(function(){
      console.log("Co loi khi ket thuc chuyen di");
    });
    });
//         var goiXe1= diemController.goiXe(data, locationXe);
socket.on("tuChoiKhachHang", function(thongtinKhachDi){
  // 1. Update trạng thái tài xế thành rảnh
  // 2. Update trạng thái khách đã đi xong

  console.log(thongtinKhachDi);
  console.log(locationXe);
  console.log("socket thang moi ne"+socket.id);
    var gxstc = diemController.goiXeSauTuChoi(thongtinKhachDi, locationXe, socket.id);
    // console.log("testttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt");
    // console.log(thongtinKhachDi);
    var ttKhachTraVe = {kinhdo: thongtinKhachDi.lat, vido : thongtinKhachDi.lng, sdtkh: thongtinKhachDi.sdtkh};
    if(gxstc == null){
      console.log("Khong con xe ranh");
      //cập nhật thông tin điểm thành ko có xe rảnh
    }else{
      io.to(gxstc.id).emit('yeuCauXe', ttKhachTraVe);
    }
    
  //  io.to(gxstc.id).emit('yeuCauXe', data);
  });

  // APP TÀI XẾ END
  socket.on("timThayDiaDiem", function(data){
    //cập nhật thông tin trạng thái về cho app quản lsy điểm
    diemController.getAllDiem()
    .then(function(listAll){
      io.sockets.emit("Server-send-full-list",listAll);
    });
    console.log(data);
    diemController.dinhViDiemThanhCong(data)
    .then(function(){
      console.log("Dang goi controller dinh vi diemt hành cong");
      // update danh sa ch điểm chua định vị cho client
      diemController.getListDiemChuaDinhVi()
      .then(function (result2) {
        if(result2.length<1){
          console.log("k co diem");
        }else{
          // for( d=0; d<result2.length; d++){
          //   result2.length[d].thoigiandat= result2.length[d].thoigiandat.toString();
          // }
          console.log(result2);
          io.sockets.emit("Server-send-list-diem-chua-dinh-vi",result2);
           // gửi về client danh sách xe đang rảnh
        // const objs = JSON.parse(data);
        // console.log("obj ne "+data.madiem);
        // lấy ra danh sách xe cùng loại mà địa điểm đang yêu cầu
        chuyenXeController.getListDriverFree(data.loaixe)
        .then(function(listChuyenXe){
          //console.log(listChuyenXe);
          /* tính toán 10 xe gần nhất*/
         // console.log(listChuyenXe);
          var arrXe = [];
         console.log(listChuyenXe);
          var l = listChuyenXe.length;
          var lol = diemController.hihi(10.7764,106.68, 10.8039,106.636);
          console.log(lol);
          var listXeGanKhachNhat =[];
          listXeGanKhachNhat = diemController.getArrXeGanDiem(data, listChuyenXe, l);
          console.log(listXeGanKhachNhat);
          // io.sockets.emit("Server-send-list-xe-ranh",listXeGanKhachNhat);
          io.to(socket.id).emit("Server-send-list-xe-ranh",listXeGanKhachNhat);
          // GỌI XE CHO NÓ truyền vào data là điểm, list xe online
          console.log("data neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
          console.log(data);
          console.log(locationXe);
         var goiXe1= diemController.goiXe(data, locationXe);
        console.log("id tai xe neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"+goiXe1.id);
        // .then(function(xxxx){
          //GỞI THÔNG TIN ĐIỂM VỀ XE  TÌM THẤY
          io.to(goiXe1.id).emit('yeuCauXe', data);
        });
        }
       
      });
    })
    .catch(
      function(){
        console.log("co gi do sai sai");
        
      });
    
    io.sockets.emit("Server-send-list-diem-chua-dinh-vi1","tim thay dia diem roi");
  //  io.sockets.emit("tradulieu","hihi");
  });
 
  // taiXeGuiToaDo

  // APP ĐỊNH VỊ ĐIỂM END

  io.on("disconnect", function(){
    
    console.log("Client ngắt kết nối");
  });
  
});
