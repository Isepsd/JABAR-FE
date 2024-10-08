interface IFdir {
  id:string;
  nama: string;
}

export const FdirField = {
  id: null, // id field primary key harus ada ini perlu untuk update
  nama: '',
}

export type { IFdir };