interface IDispatcher {
  id: string;
  nama: string;
  jenis:''
  created_user: string;
  updated_user: string;
}

export const DispatcherField = {
  id: null,  // id field primary key harus ada ini perlu untuk update
  nama: '',
  jenis: '',
  created_user: '',
  updated_user: ''
}


export type { IDispatcher };