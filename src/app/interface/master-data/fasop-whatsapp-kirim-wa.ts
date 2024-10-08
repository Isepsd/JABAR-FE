interface IKirim_wa {
    preventDefault(): unknown;
    id: string;
    msg: string;
    id_user_created: string;
    id_wa_kontak: string;
    date_send: Date;
    status:number;
    status_sent:number
  }
  
  export const Kirim_wa_field = {
    id: null, // id field primary key harus ada ini perlu untuk update
    msg: '',
    id_user_created: '',
    id_wa_kontak: '',
    date_send: '',
    status:'',
    status_sent:''
  }
  
  export type { IKirim_wa };