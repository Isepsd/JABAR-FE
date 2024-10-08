interface IFasSistemScada {
  id_sistem_scada: number;
  name: string;
  jenis_scada: string;
  jenis_koneksi: string;
  ip_db1: string;
  name_db1: string;
  instance_db1: string;
  port_db1: string;
  username_db1: string;
  password_db1: string;
  status_db1: string;
  ip_db2: string;
  name_db2: string;
  instance_db2: string;
  port_db2: string;
  username_db2: string;
  password_db2: string;
  status_db2: string;
}

export const FasSistemScadaField = {
  id_sistem_scada: undefined,
  name: '',
  jenis_scada: null,
  jenis_koneksi: null,
  ip_db1: '',
  name_db1: '',
  instance_db1: '',
  port_db1: '',
  username_db1: '',
  password_db1: '',
  status_db1: '',
  ip_db2: '',
  name_db2: '',
  instance_db2: '',
  port_db2: '',
  username_db2: '',
  password_db2: '',
  status_db2: ''
}

export type { IFasSistemScada };
