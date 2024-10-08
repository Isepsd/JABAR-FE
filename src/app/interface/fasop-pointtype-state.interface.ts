import { IFasopPointType } from './fasop-pointtype.interface';

interface IFasopPointTypeState {
  id_pointtype_state: any;
  data: any;
  id: any;
  id_pointtype: string;
  pointtype: IFasopPointType;
  name: string;
  value: string;
  status: number;
  valid: number;
  date_created: string;
  statekey: number;
  quality_code: string;
  number:number;
}

export const FasopPointTypeStateField = {
  id_pointtype: null,
  name: null,
  data: null,
  status: 0,
  valid: 0,
  value: 0,
  statekey: 0,
  quality_code: null,
};

export type { IFasopPointTypeState };
