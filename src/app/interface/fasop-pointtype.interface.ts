// import { IFasopTelegramGroup } from "./fasop-telegram-group.interface";

interface IFasopPointType {
  id_pointtype?: any;
  id_induk_pointtype?: any;
  name: string;
  status: number;
  datum_created: string;
  log_his: number;
  jenispoint: number;
  show_grafik: number;
  no_urut: number;
  warna: string;
  key: any;
  send_telegram: number;
  format_pesan: string;
  durasi_perubahan: number;
  id_telegram_group: number | null;
  telegram_group: any;
  child_pointtype: any;
  induk: any;
}
/** YANG DI PAKE DI FORM */
export const FasopPointTypeField: any = {
  id_pointtype: null,
  name: "",
  key: "",
  status: 0,
  datum_created: "",
  log_his: 0,
  jenispoint: "",
  show_grafik: 0,
  no_urut: 0,
  warna: "",
  send_telegram: 0,
  format_pesan: "",
  durasi_perubahan: 0,
  id_telegram_group: null,
  id_induk_pointtype: null,
  telegram_group: null,
  induk: 1,
};

export type { IFasopPointType };
