-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 31, 2018 at 02:10 PM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `appdatxe`
--

-- --------------------------------------------------------

--
-- Table structure for table `chuyenxe`
--

CREATE TABLE `chuyenxe` (
  `machuyenxe` int(11) NOT NULL,
  `mataixe` int(11) NOT NULL,
  `kinhdo` float NOT NULL,
  `vido` float NOT NULL,
  `tinhtrangchuyen` int(11) NOT NULL,
  `loaixe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `chuyenxe`
--

INSERT INTO `chuyenxe` (`machuyenxe`, `mataixe`, `kinhdo`, `vido`, `tinhtrangchuyen`, `loaixe`) VALUES
(1, 12, 10.7764, 106.68, 0, 0),
(2, 13, 10.8039, 106.636, 0, 0),
(3, 3, 10.8057, 106.629, 0, 0),
(4, 4, 10.8017, 106.636, 0, 0),
(5, 3, 10.8057, 106.648, 0, 0),
(6, 6, 10.9683, 106.486, 0, 0),
(7, 7, 10.7825, 106.682, 0, 0),
(8, 8, 10.7858, 106.667, 0, 0),
(9, 9, 10.7877, 106.67, 0, 0),
(10, 10, 10.7917, 106.672, 0, 0),
(11, 11, 10.7914, 106.682, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `diem`
--

CREATE TABLE `diem` (
  `madiem` int(11) NOT NULL,
  `kinhdo` float NOT NULL,
  `vido` float NOT NULL,
  `sdtkh` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `tinhtrang` int(11) NOT NULL,
  `solandinhvi` int(11) NOT NULL,
  `vitritruocdinhvi` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `vitrisaudinhvi` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `loaixe` int(11) NOT NULL,
  `thoigiandat` datetime NOT NULL,
  `ghichu` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `mataixe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `diem`
--

INSERT INTO `diem` (`madiem`, `kinhdo`, `vido`, `sdtkh`, `tinhtrang`, `solandinhvi`, `vitritruocdinhvi`, `vitrisaudinhvi`, `loaixe`, `thoigiandat`, `ghichu`, `mataixe`) VALUES
(5, 10.7627, 106.683, '69696', 1, 0, 'Trường Đại học Khoa học Tự nhiên, Nguyễn Văn Cừ, phường 4, Hồ Chí Minh', '', 0, '2017-12-18 18:20:39', '123', 0),
(9, 10.7614, 106.71, '123213213213', 1, 0, 'Đại học nguyễn tất thành', '', 0, '2018-01-14 10:23:26', ' ', 0),
(31, 10.807, 106.666, '09999999', 4, 0, 'Đại học hoa sen', '', 0, '2018-01-18 10:03:27', '123', 3),
(42, 10.7661, 106.639, '0979418395', 4, 0, 'đầm sen', '', 0, '2018-01-18 18:01:09', '1123', 3),
(43, 10.7327, 106.7, '0979418395', 1, 0, 'đại học tôn đức thắng', '', 0, '2018-01-18 18:06:34', 'v', 0),
(44, 10.7741, 106.693, '0979418395', 4, 0, 'công viên tao đàn', '', 0, '2018-01-18 18:08:02', 'v', 3),
(47, 10.7945, 106.655, '123', 4, 0, 'bệnh viện tân bình', '', 0, '2018-01-18 19:08:58', 'yy', 3),
(48, 10.7661, 106.639, '123', 4, 0, 'đầm sen', '', 0, '2018-01-18 19:10:20', 'yy', 4),
(49, 10.8657, 106.802, '123', 4, 0, 'suối tiên', '', 0, '2018-01-18 19:10:55', 'yy', 5),
(50, 10.7482, 106.585, '123', 1, 0, 'bệnh viện bình tân', '', 0, '2018-01-18 19:17:48', 'yy', 0),
(51, 10.9838, 106.576, '123', 4, 0, 'bệnh viện củ chi', '', 0, '2018-01-18 19:19:43', 'yy', 3),
(53, 10.7968, 106.656, '123', 4, 0, 'cao đẳng kỹ thuật lý tự trọng', '', 0, '2018-01-18 19:24:55', 'yy', 3),
(54, 10.807, 106.666, '123', 4, 0, 'đại học hoa sen', '', 0, '2018-01-18 19:27:45', 'yy', 3),
(55, 0, 0, '123', 0, 0, 'đại học sài gòn', '', 0, '2018-01-18 19:30:41', 'yy', 0),
(56, 10.7945, 106.655, '0123', 1, 0, 'bệnh viện tân bình', '', 0, '2018-01-18 20:10:14', 'v', 0),
(57, 10.7832, 106.695, '134', 4, 0, 'đại học kinh tế thành phố hồ chí minh', '', 0, '2018-01-18 20:13:29', 'r', 3),
(58, 10.7641, 106.683, '111', 3, 0, 'now zone', '', 0, '2018-01-18 20:16:19', '213213', 3);

-- --------------------------------------------------------

--
-- Table structure for table `khachhang`
--

CREATE TABLE `khachhang` (
  `sdt` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `tenkh` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `khachhang`
--

INSERT INTO `khachhang` (`sdt`, `tenkh`) VALUES
('01131113', 'khách 113'),
('0123', 'tr'),
('0123123123', 'Tèo'),
('0123123312', 'khách 123'),
('0696969', 'Khách 69'),
('0979418395', 'Trọng'),
('09888888', 'trọng 8'),
('09999999', 'khách 99'),
('111', 'tọng'),
('123', 'trong'),
('12323', 'tr'),
('134', 'r'),
('2222', 'tọng'),
('69696', 'tr');

-- --------------------------------------------------------

--
-- Table structure for table `loainhanvien`
--

CREATE TABLE `loainhanvien` (
  `maloai` int(11) NOT NULL,
  `tenloai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `loaixe`
--

CREATE TABLE `loaixe` (
  `maloaixe` int(11) NOT NULL,
  `tenloaixe` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nhanvien`
--

CREATE TABLE `nhanvien` (
  `manv` int(11) NOT NULL,
  `tennv` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `diachi` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `sdt` int(11) NOT NULL,
  `loainv` int(11) NOT NULL,
  `tendangnhap` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `matkhau` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `nhanvien`
--

INSERT INTO `nhanvien` (`manv`, `tennv`, `diachi`, `sdt`, `loainv`, `tendangnhap`, `matkhau`) VALUES
(1, 'Lường Văn Trọng', 'Tân Bình, TP Hồ Chí Minh', 123123123, 1, 'lvtrong1993', '123'),
(2, 'trọng định vị viên', '123  Tân Phú', 12321321, 2, 'trongdvv', '123'),
(3, 'Trọng tài xế', 'Tân bình', 123131, 3, 'trongtx', '123'),
(4, 'Tài xế số 2', '123 nhà tài xế', 69696969, 3, 'taixe2', '123'),
(5, 'tài xế 3', '113 tân bình', 123123, 3, 'taixe3', '123');

-- --------------------------------------------------------

--
-- Table structure for table `tinhtrangxe`
--

CREATE TABLE `tinhtrangxe` (
  `matinhtrang` int(11) NOT NULL,
  `tentinhtrang` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `trangthaidiem`
--

CREATE TABLE `trangthaidiem` (
  `matrangthai` int(11) NOT NULL,
  `tentrangthai` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chuyenxe`
--
ALTER TABLE `chuyenxe`
  ADD PRIMARY KEY (`machuyenxe`);

--
-- Indexes for table `diem`
--
ALTER TABLE `diem`
  ADD PRIMARY KEY (`madiem`);

--
-- Indexes for table `khachhang`
--
ALTER TABLE `khachhang`
  ADD UNIQUE KEY `unisdt` (`sdt`);

--
-- Indexes for table `loainhanvien`
--
ALTER TABLE `loainhanvien`
  ADD PRIMARY KEY (`maloai`);

--
-- Indexes for table `loaixe`
--
ALTER TABLE `loaixe`
  ADD PRIMARY KEY (`maloaixe`);

--
-- Indexes for table `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`manv`);

--
-- Indexes for table `tinhtrangxe`
--
ALTER TABLE `tinhtrangxe`
  ADD PRIMARY KEY (`matinhtrang`);

--
-- Indexes for table `trangthaidiem`
--
ALTER TABLE `trangthaidiem`
  ADD PRIMARY KEY (`matrangthai`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chuyenxe`
--
ALTER TABLE `chuyenxe`
  MODIFY `machuyenxe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `diem`
--
ALTER TABLE `diem`
  MODIFY `madiem` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
--
-- AUTO_INCREMENT for table `loainhanvien`
--
ALTER TABLE `loainhanvien`
  MODIFY `maloai` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `loaixe`
--
ALTER TABLE `loaixe`
  MODIFY `maloaixe` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `nhanvien`
--
ALTER TABLE `nhanvien`
  MODIFY `manv` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `tinhtrangxe`
--
ALTER TABLE `tinhtrangxe`
  MODIFY `matinhtrang` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `trangthaidiem`
--
ALTER TABLE `trangthaidiem`
  MODIFY `matrangthai` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
