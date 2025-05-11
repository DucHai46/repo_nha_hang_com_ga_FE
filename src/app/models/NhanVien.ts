export interface NhanVien {
  id: string;
  tenNhanVien: string;
  soDienThoai: string;
  email: string;
  diaChi: string;
  ngaySinh: string;
  chucVu: string;
}

export interface NhanVienResponse {
  id: string;
  tenNhanVien: string;
  soDienThoai: string;
  email: string;
  diaChi: string;
  ngaySinh: string;
  chucVu: {
    id: string;
    name: string;
  };
}

