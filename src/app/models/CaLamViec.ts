import { Time } from "@angular/common";

export interface CaLamViec {
  id: string;
  tenCaLamViec: string;
  // khungThoiGian: string;
  gioVao: Time;
  gioRa: Time;
  moTa: string;
}