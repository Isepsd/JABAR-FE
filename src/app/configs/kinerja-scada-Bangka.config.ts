export const CONFIG_BOX_BULANAN = [
  {
    "label": "RTU",
    "value": "99",
    "suffix": "%",
    "variant": "warning",
    path: "dashboard.kinerja_scada.kinerja_box.bulanan_rtu_bangka_belitung_bulan_ini",
    "filterParams": {"id_unit":"6319"}
  },
  
 
]


export const CONFIG_BOX_BULANAN_LALU = [
  {
    "label": "RTU",
    "value": "99",
    "suffix": "%",
    "variant": "warning",
    path: "dashboard.kinerja_scada.kinerja_box.bulanan_rtu_bangka_belitung_bulan_kemarin",
    "filterParams": {"id_unit":"6319"}
  },
  
 
 
]

export const CONFIG_BOX_BULANAN_SCADA = [
  {
    "label": "MASTER",
    "value": "99",
    "suffix": "",
    "variant": "success",
    path: "dashboard.kinerja_scada.kinerja_box.bulanan_master"
  },
  {
    "label": "RTU",
    "value": "99",
    "suffix": "",
    "variant": "warning",
    path: "dashboard.kinerja_scada.kinerja_box.bulanan_rtu"
  },
  {
    "label": "TELEKOMUNIKASI",
    "value": "99",
    "suffix": "",
    "variant": "primary",
    path: "dashboard.kinerja_scada.kinerja_box.bulanan_telkom"
  },
  {
    "label": "TELESIGNAL",
    "value": "99",
    "suffix": "",
    "variant": "danger",
    path: "dashboard.kinerja_scada.kinerja_box.bulanan_rc"
  },
  {
    "label": "TELEMETERING",
    "value": "99",
    "suffix": "",
    "variant": "disgust",
    path: "dashboard.kinerja_scada.kinerja_box.bulanan_telemetring"
  }
]

export const CONFIG_BOX_KOMULATIF = [
  {
    "label": "RTU",
    "value": "99",
    "suffix": "%",
    "variant": "warning",
    path: "dashboard.kinerja_scada.kinerja_box.bulanan_rtu_bangka_belitung_bulan_komulatif",
    "filterParams": {"id_unit":"6319"}
  },
 
 
]

export const CONFIG_GRAFIK_KOMULATIF = [
 
  
  {
    label: "RTU 150KV/20KV",
    title: "GRAFIK RTU 150KV/20KV TAHUN " + new Date().getFullYear(),
    path: "dashboard.kinerja_scada.komulatif.rc_bangka_belitung",
    "filterParams": { "path1": "LBS,ACR" }
  },
]

export const CONFIG_INFO_RTU = [
  {
    "label": "GI",
    "value": "10",
    "suffix": "",
    path: "dashboard.kinerja_scada.kinerja_box.rtu_komplikasi",
    "filterParams": { "name": "RTU GI","id_unit":"6319" }
    
  },
  {
    "label": "GH",
    "value": "9",
    "suffix": "",
    path: "dashboard.kinerja_scada.kinerja_box.rtu_komplikasi",
    "filterParams": { "name": "RTU GH","id_unit":"6319" }
  },
  {
    "label": "LBS",
    "value": "9",
    "suffix": "",
    path: "dashboard.kinerja_scada.kinerja_box.rtu_komplikasi",
    "filterParams": { "name": "RTU LBS","id_unit":"6319" }
  },
  {
    "label": "ACR",
    "value": "9",
    "suffix": "",
    path: "dashboard.kinerja_scada.kinerja_box.rtu_komplikasi",
    "filterParams": { "name": "RTU ACR","id_unit":"6319" }
  },
  {
    "label": "ACR",
    "value": "9",
    "suffix": "",
    path: "dashboard.kinerja_scada.kinerja_box.rtu_komplikasi",
    "filterParams": { "name": "RTU ACR","id_unit":"6319" }
  },
  {
    "label": "ACR",
    "value": "9",
    "suffix": "",
    path: "dashboard.kinerja_scada.kinerja_box.rtu_komplikasi",
    "filterParams": { "name": "RTU ACR","id_unit":"6319" }
  },
  {
    "label": "ACR",
    "value": "9",
    "suffix": "",
    path: "dashboard.kinerja_scada.kinerja_box.rtu_komplikasi",
    "filterParams": { "name": "RTU ACR","id_unit":"6319" }
  },
 
]

export const CONFIG_RTU_POOL = [
  {
    "label": "RTU IN POOL",
    "value": "10",
    "suffix": "",
    path: "dashboard.kinerja_scada.kinerja_box.rtu_in_pool"
  },

  {
    "label": "RTU OUT POOL",
    "value": "10",
    "suffix": "",
    path: "dashboard.kinerja_scada.kinerja_box.rtu_out_pool"
  }
]