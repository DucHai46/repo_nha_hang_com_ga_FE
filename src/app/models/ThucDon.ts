export interface ThucDon {
  tenThucDon: string;
  loaiMonAns: LoaiMonAnTrongCombo[];
  trangThai: number;
  combos: ComboTrongThucDon[];
}
interface ComboTrongThucDon {
  id: string;
  name: string;
  hinhAnh: string;
  giaTien: string;
  moTa: string;
}

interface LoaiMonAnTrongCombo {
  id: string;
  name: string;
  monAns: MonAnTrongCombo[];
  moTa: string;
}

interface MonAnTrongCombo {
  id: string;
  tenMonAn: string;
  hinhAnh: string;
  giaTien: string;
  moTa: string;
  giamGia: string;
}