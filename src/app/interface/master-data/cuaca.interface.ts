interface ICuaca {
  id: string;
  nama: string;
  // created_user: string;
  // updated_user: string;
  // status:boolean
}

export const CuacaField = {
  id: null, // id field primary key harus ada ini perlu untuk update
  nama: '',
  // created_user: '',
  // updated_user: '',
  // status: true
}

export type { ICuaca };
