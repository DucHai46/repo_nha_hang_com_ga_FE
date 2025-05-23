export interface LichLamViec {
  id: string;
  ngay: Date;
  chiTietLichLamViec: ChiTietLichLamViec[];
  moTa: string;
}

interface ChiTietLichLamViec {
  caLamViec: {
    id: string;
    name: string;
  };
  nhanVienCa: NhanVienCa[];
  moTa: string;
}

interface NhanVienCa {
  nhanVien: {
    id: string;
    name: string;
  };
  moTa: string;
}