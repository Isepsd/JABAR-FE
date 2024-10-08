interface IIndikasi {
  id:string;
  nama: string;
  jenis: string;
  // created_user: string;
  // update_user: string;
}

export const IndikasiField = {
  id:null, // id field primary key harus ada ini perlu untuk update
  nama: '',
  jenis: '',
  // created_user: '',
  // update_user: '', 
}

export type { IIndikasi };
