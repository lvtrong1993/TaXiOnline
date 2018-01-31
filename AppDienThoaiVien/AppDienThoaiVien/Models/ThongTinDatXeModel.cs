using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AppDienThoaiVien.Models
{
    class ThongTinDatXeModel
    {
       
        public string sdtKH { get; set; }
        public string tenKH { get; set; }
        public int loaiXE { get; set; }
        public string viTri { get; set; }
        public string ghiChu { get; set; }
        public string thoiGianDat { get; set; }
        public int maTaiXe { get; set; }
        public ThongTinDatXeModel(string sdt, string ten, int loaixe, string vitri, string ghichu, string tgdat, int maTX)
        {
            this.sdtKH = sdt;
            this.tenKH = ten;
            this.loaiXE = loaixe;
            this.viTri = vitri;
            this.ghiChu = ghichu;
            this.thoiGianDat = tgdat;
            this.maTaiXe = maTX;
        }


    }

}
