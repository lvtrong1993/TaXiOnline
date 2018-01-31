using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AppDienThoaiVien.Models
{
    class LoginViewModel
    {
        public bool result { get; set; }
        public int maNV { get; set; }
        public string tenNV { get; set; }
        public int loaiNV { get; set; }

        public LoginViewModel() { }
        public LoginViewModel(string us, string pwd)
        {
        //    this.userName = us;
         //   this.Password = pwd;
        }
    }
}
