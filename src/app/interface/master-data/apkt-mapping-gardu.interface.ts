// import { IFasopWhatsappKontakGroup } from "./fasop-whatsapp-kontak-group.interface";

interface IMappingGardu {
    // id_scd_statusgardu: number;
    // id_scd_statusgardu: string;
    id:string;
    name: string;
    gardu_mjd: string;
    aktif: number;

    // id_wa_group: number;

    // id_group: IMappingGarduGroup;


}

export const MappingGarduField = {
    // id_scd_statusgardu: undefined,
    id: undefined,
    // id_group: null,
    name: '',
    gardu_mjd: '',

    aktif: 0,
    // id_wa_group: null,

};

export type { IMappingGardu };
