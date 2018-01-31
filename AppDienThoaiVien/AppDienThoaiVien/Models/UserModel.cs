using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AppDienThoaiVien.Models
{
    class UserModel
    {
        public string userName { get; set; }
        public string Password { get; set; }
        public UserModel() { }
        public UserModel(string us, string pwd)
        {
            this.userName = us;
            this.Password = pwd;
        }
    }
}
