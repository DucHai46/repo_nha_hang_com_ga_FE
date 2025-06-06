export interface Combo {
  tenCombo: string;
  loaiMonAns: LoaiMonAnTrongCombo[];
  hinhAnh: string;
  giaTien: number;
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
  giaTien: number;
  moTa: string;
}