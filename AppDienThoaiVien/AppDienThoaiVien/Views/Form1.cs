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
using System.Windows.Forms;

namespace AppDienThoaiVien
{
    public partial class frmMain : Form
    {
        Socket socket ;
       // socket = Session.socket;
        public frmMain()
        {
            InitializeComponent();
            Control.CheckForIllegalCrossThreadCalls = false;
            
        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void frmMain_Load(object sender, EventArgs e)
        {
            lblSDT.Text = "";
            lblTenKH.Text = "";
            cbLoaiXe.SelectedIndex = 0;
            lblErrorSDT.Text = "";
            lblErrorTenKH.Text = "";
            lblErrorViTri.Text = "";
            socket = Session.socket;
           // socket = IO.Socket("http://localhost:5000");
           
            
            




           

        }

        private void panel1_Paint(object sender, PaintEventArgs e)
        {

        }

        private void textBox1_MouseLeave(object sender, EventArgs e)
        {
            MessageBox.Show("tesst move live" );
        }

        private void textBox1_Leave(object sender, EventArgs e)
        {
            // MessageBox.Show("tesst move live");
            string sdt = txtSoDienThoai.Text;
            UserModel user = new UserModel("Trong", "123");
            var jsonUser = JsonConvert.SerializeObject(user);
           // var sdt = txtSDT.Text;
            socket.Emit("Client-check-exits-customer", sdt);
            socket.On("Server-send-list-diem", (data) => {
                string jsonUser2 = JsonConvert.SerializeObject(data);
                List<diemModel> dsDiem = JsonConvert.DeserializeObject<List<diemModel>>(jsonUser2);

                if (dsDiem.Count() > 0)
                {
                    lblTenKH.Text = dsDiem[0].tenkh;
                    lblSDT.Text = dsDiem[0].sdt;
                    txtTenKhachHang.Text= dsDiem[0].tenkh;
                    loadPlaceInfor(dsDiem);
                }else
                {
                    lblSDT.Text = "";
                    lblTenKH.Text = "";
                    dataGridViewHistory.Rows.Clear();
                    dataGridViewHistory.Refresh();
                }

                
               // MessageBox.Show(dsDiem[0].thoigiandat.ToString());
            });




           // socket.Emit("Client-send-data", jsonUser);

        }

        private void loadPlaceInfor(List<diemModel> listPlace)
        {
            DataTable table = new DataTable();
        
            table.Columns.Add("Vị trí", typeof(string));
            table.Columns.Add("Loại xe", typeof(string));
            table.Columns.Add("Thời gian đặt", typeof(string));
         //   table.Columns.Add("Tình trạng", typeof(string));
            table.Columns.Add("Ghi chú", typeof(string));
            
            for (int i=0; i< listPlace.Count(); i++)
            {
                string lx = "Thường";
                if (listPlace[i].loaixe == 1)
                {
                    lx = "Premium";
                }
                table.Rows.Add(listPlace[i].vitritruocdinhvi, lx, listPlace[i].thoigiandat, listPlace[i].ghichu);


               // table.Rows.Add(ks[i].maKS, ks[i].tenKS, ks[i].soSao, ks[i].duong, ks[i].quan, ks[i].thanhPho, ks[i].giaTB, ks[i].moTa);

            }
            dataGridViewHistory.DataSource = table;

            DataGridViewButtonColumn col = new DataGridViewButtonColumn();
            col.UseColumnTextForButtonValue = true;
            col.Text = "Gọi";
            col.Name = "Gọi xe";
            dataGridViewHistory.Columns.Add(col);

            DataGridViewColumn column = dataGridViewHistory.Columns[0];
            DataGridViewColumn column1 = dataGridViewHistory.Columns[1];
            DataGridViewColumn column2 = dataGridViewHistory.Columns[2];
            DataGridViewColumn column3 = dataGridViewHistory.Columns[3];
            column1.Width = 150;
            column.Width = 200;
            column2.Width = 170;
            column3.Width = 200;


        }

        private bool validateForm()
        {
            string sdt = txtSoDienThoai.Text;
            string tenKH = txtTenKhachHang.Text;
            int loaiXe = cbLoaiXe.SelectedIndex;
            string viTri = txtViTri.Text;
            string ghiChu = txtGhiChu.Text; 
         
            if (string.IsNullOrWhiteSpace(txtSoDienThoai.Text))
            {
                lblErrorSDT.Text = "*";
                return false;
            }
            else
            {
                try
                {
                    int x = Int32.Parse(txtSoDienThoai.Text);
                }
                catch (Exception ex)
                {
                    lblErrorSDT.Text = "*";
                    MessageBox.Show("Số điện thoại phải là kiểu số", "Thông báo", MessageBoxButtons.OK, MessageBoxIcon.Warning);

                    return false;
                }
                lblErrorSDT.Text = "";
            }

            if (string.IsNullOrWhiteSpace(txtTenKhachHang.Text))
            {
                lblErrorTenKH.Text = "*";
                return false;
            }
            else
            {

                lblErrorTenKH.Text = "";
            }

            if (string.IsNullOrWhiteSpace(txtViTri.Text))
            {
                lblErrorViTri.Text = "*";
                return false;
            }
            else
            {

                lblErrorViTri.Text = "";
            }
            if (string.IsNullOrWhiteSpace(txtGhiChu.Text))
            {
                // lblErrorViTri.Text = "*";
                // return false;
                txtGhiChu.Text = " ";
            }

            return true;
        }
        private void btnOK_Click(object sender, EventArgs e)
        {
            /*
              UserModel user = new UserModel(txtUsername.Text, txtPassword.Text);
                var jsonUser = JsonConvert.SerializeObject(user);

                socket.Emit("Client-check-login", jsonUser);*/

            bool valid = validateForm();
            if (valid)
            {
                string sdt = txtSoDienThoai.Text;
                string tenKH = txtTenKhachHang.Text;
                int loaiXe = cbLoaiXe.SelectedIndex;
                string viTri = txtViTri.Text;
                string ghiChu = txtGhiChu.Text;
                string thoiGianDat = DateTime.Now.ToString("yyyy:MM:dd:HH:mm:ss");
              //  MessageBox.Show(thoiGianDat, "Thông báo", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                ThongTinDatXeModel tt = new ThongTinDatXeModel(sdt, tenKH, loaiXe, viTri, ghiChu, thoiGianDat, -1);
                var jsonThongTinDatXe = JsonConvert.SerializeObject(tt);
                socket.Emit("Client-send-Diem-info", jsonThongTinDatXe);


                /*load lại listview*/
             /*   lblSDT.Text = "";
                lblTenKH.Text = "";
                dataGridViewHistory.DataSource = null;
                dataGridViewHistory.Rows.Clear();
                dataGridViewHistory.Refresh();

                socket.Emit("Client-check-exits-customer", sdt);
                socket.On("Server-send-list-diem", (data) =>
                {
                    string jsonUser2 = JsonConvert.SerializeObject(data);
                    List<diemModel> dsDiem = JsonConvert.DeserializeObject<List<diemModel>>(jsonUser2);

                    if (dsDiem.Count() > 0)
                    {
                        lblTenKH.Text = dsDiem[0].tenkh;
                        lblSDT.Text = dsDiem[0].sdt;
                        txtTenKhachHang.Text = dsDiem[0].tenkh;
                        loadPlaceInfor(dsDiem);
                    }
                    else
                    {
                        lblSDT.Text = "";
                        lblTenKH.Text = "";
                        dataGridViewHistory.Rows.Clear();
                        dataGridViewHistory.Refresh();
                    }
                });
                */
                    //load lại list view

                }else
            {
                MessageBox.Show("Thiếu thông tin vui lòng kiểm tra lại", "Thông báo", MessageBoxButtons.OK, MessageBoxIcon.Warning);

            }





        }

        private void txtSoDienThoai_TextChanged(object sender, EventArgs e)
        {

        }

        private void dataGridViewHistory_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
              if (dataGridViewHistory.SelectedCells.Count >= 1)
            {
                int selectedrowindex = dataGridViewHistory.CurrentCell.RowIndex;

                DataGridViewRow selectedRow = dataGridViewHistory.Rows[selectedrowindex];

                string sdt1 = txtSoDienThoai.Text;
                string tkh1 = txtTenKhachHang.Text;
                string tmpLX = Convert.ToString(selectedRow.Cells[1].Value);
                int malx = 0;
                if (tmpLX != "Thường")
                {
                     malx = 1;
                }
                string vitri = Convert.ToString(selectedRow.Cells[0].Value);
                string gchu = "a";

                string thoiGianDatXe = DateTime.Now.ToString("yyyy:MM:dd:HH:mm:ss");


                //   string maT = Convert.ToString(selectedRow.Cells[0].Value);
                ThongTinDatXeModel ttt = new ThongTinDatXeModel(sdt1, tkh1, malx, vitri, gchu, thoiGianDatXe, 999);
                var jsonThongTinDatXee = JsonConvert.SerializeObject(ttt);
                
               


                try
                {
                    // socket.Emit("testDatLoun", "xxxxxx");
                    socket.Emit("testDatLoun", jsonThongTinDatXee);


                }
                catch (Exception ex)
                {
                    MessageBox.Show("Có lỗi, vui lòng kiểm tra lại", "Thông báo",
                MessageBoxButtons.OK, MessageBoxIcon.Error);
                }

            }
        }
    }
}
