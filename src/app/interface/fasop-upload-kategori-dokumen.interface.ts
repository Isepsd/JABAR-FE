interface IFasUploadKatDokumen {
  kat_dok_detail_id: string;
  kat_dok_id: any;
  nama: string;
  keterangan: string;

}

export const FasUploadKatDokumenField = {
  kat_dok_detail_id: null,
  kat_dok_id: null,
  nama: '',
  keterangan: '',

}

export type { IFasUploadKatDokumen };
