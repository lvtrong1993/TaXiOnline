using AppDienThoaiVien.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Quobject.SocketIoClientDotNet.Client;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading;
using System.Windows.Forms;

namespace AppDienThoaiVien.Views
{
    public partial class Login : Form
    {
        Socket socket;
        private static int x, y;
        public Login()
        {
            InitializeComponent();
        }

        private void panel2_MouseMove(object sender, MouseEventArgs e)
        {
            if (e.Button == MouseButtons.Left)
            {
                SetDesktopLocation(MousePosition.X - x - panel2.Location.X - Screen.PrimaryScreen.WorkingArea.X, MousePosition.Y - y - panel2.Location.Y - Screen.PrimaryScreen.WorkingArea.Y);
            }
        }

        private void panel2_MouseDown(object sender, MouseEventArgs e)
        {
            x = e.X;
            y = e.Y;
        }

        private void Login_Load(object sender, EventArgs e)
        {
            socket = IO.Socket("http://localhost:5001");
            Session.socket = socket;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            frmMain fm1 = new frmMain();
            bool chkEmpty=checkEmptyForm();
            if (chkEmpty == true)
            {
                MessageBox.Show("Thiếu thông tin vui lòng kiểm tra lại","Thông báo",MessageBoxButtons.OK,MessageBoxIcon.Warning  );
            }else
            {
            
         
                UserModel user = new UserModel(txtUsername.Text, txtPassword.Text);
                var jsonUser = JsonConvert.SerializeObject(user);

                socket.Emit("Client-check-login", jsonUser);
                bool check = false;
                socket.On("Server-check-login", (data) =>
                {
                    var jobject = data as JToken;
                    string rs  = JsonConvert.SerializeObject(data);
                  //  JObject json = JObject.Parse(rs);
                    LoginViewModel rsLogin = JsonConvert.DeserializeObject<LoginViewModel>(rs);

                    if (rsLogin.result == true)// rsLogin.result là 1 phần tử trong Json mà Server trả về true/false
                    {

                        Session.maNV = rsLogin.maNV;
                        Session.tenNV = rsLogin.tenNV;
                        Session.loaiNV = rsLogin.loaiNV;
                        // MessageBox.Show("KQ " + rsLogin.result + " Mã Nv" + rsLogin.maNV + " Tên Nv" + rsLogin.tenNV + " loại nv" + rsLogin.loaiNV);
                         check =true;
                     
                    }
                    else
                    {
                        
                         MessageBox.Show("Đăng nhập thất bại");
                    }
                });
                Thread.Sleep(3000);
                if (check == true)
                {
                    fm1.Show();
                    this.Hide();
                }
                else
                {
                    MessageBox.Show("lỗi");
                }
                //  MessageBox.Show("Check trong ngoai ON" + check);

            }
        }

        private void lblClose_Click(object sender, EventArgs e)
        {

        }

        private void lblClose_MouseClick(object sender, MouseEventArgs e)
        {
            DialogResult result = MessageBox.Show("Thoát chương trình?", "Thông báo", MessageBoxButtons.YesNo);
            if (result == DialogResult.Yes)
            {
                Application.Exit();
            }
            else
            {
                //...
            }
        }

        private void label6_Click(object sender, EventArgs e)
        {
            frmMain fm = new frmMain();
            fm.Show();
            //  this.Hide();
        }

        private void panel2_Paint(object sender, PaintEventArgs e)
        {

        }

        private bool checkEmptyForm()
        {
            if (string.IsNullOrWhiteSpace(txtUsername.Text))
            {
                lblMissingUsername.Text = "*";
                return true;
            }else
            {
                lblMissingUsername.Text = "";
            }
            if (string.IsNullOrWhiteSpace(txtPassword.Text))
            {
                lblMissingPassword.Text = "*";
                return true;
            }
            else
            {
                lblMissingPassword.Text = "";
            }
            return false;
        }
    }
}
