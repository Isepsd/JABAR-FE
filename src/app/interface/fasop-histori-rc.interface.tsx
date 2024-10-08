import moment from 'moment';
// ASET STATUS
interface IFasopRC {
  rekon:TJariangan
  kesimpulan_rekon:string
  id_his_rc:string
  keterangan:string
  datum_rekon:string
 }
 
 export const IFasopRCField = {
   rekon: '1',
   kesimpulan_rekon: null,
   keterangan: null,
   id_his_rc: null,
   datum_rekon: moment().format("YYYY-MM-DD HH:mm:ss"),
 };
 
 type TJariangan = 1 | 0;
 
 export type { IFasopRC };
 