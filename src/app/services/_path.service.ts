export const API_PATH = () => {
  return {
    cdn: {
      cdn: "cdn",
    },

    admin: {
      user: "users",
      role: "roles",
      his_kalkulasi: "admin/his-kalkulasi",
      settings: "admin/app-settings",
      retency: "admin/app-retency",
    },
    dashboard_jabar: {
      beban_box: "dashboard_jabar/beban_box",
      beban_grafik: "dashboard_jabar/beban_grafik",
    },
    dashboard_up2d_banten: {
      kinerja_scada: "dashboard/fasop/kinerja-scada",
      kinerja_rc: "dashboard/fasop/kinerja-scada/rc",
      kinerja_trip: "dashboard/fasop/kinerja-scada/trip",
      mon_rtu_count: "dashboard/fasop/monitoring-rtu/count",
      mon_rtu: "dashboard/fasop/monitoring-rtu",
      mon_rtu_frek: "dashboard/fasop/monitoring-rtu-frek",

    },
    dashboard: {
      kinerja_scada: {
        trip: {
          grafik150kv: "dashboard/kehandalan-transmisi/150kv/grafik",
          list150kv: "dashboard/kehandalan-transmisi/150kv/list",
          grafiktransmisi: "dashboard/kehandalan-transmisi/grafik",
          listtransmisi: "dashboard/kehandalan-transmisi/list",
        },
        komulatif: {
          master: "dashboard_kinerja/kinerja_grafik_master",
          rtu: "dashboard_kinerja/kinerja_grafik_rtu",
          rtu_bangka_belitung: "dashboard/kinerja-scada/rtu/grafik",
          telkom: "dashboard_kinerja/kinerja_grafik_telkom",
          telekomunikasi_bangka_belitung:
            "dashboard/kinerja-scada/telkom/grafik",
          rc: "dashboard_kinerja/kinerja_grafik_rc",
          rc_bangka_belitung: "dashboard/kinerja-scada/rc/grafik",
        },
        grafik: {
          master: "dashboard/kinerja-scada/master/grafik",
          rtu: "dashboard/kinerja-scada/rtu/grafik",
          telkom: "dashboard/kinerja-scada/telkom/grafik",
          rc: "dashboard/kinerja-scada/rc/grafik",
          telemetering: "dashboard/kinerja-scada/telemetering/grafik",
          telesignal: "dashboard/kinerja-scada/telesignal/grafik",
        },
        kinerja_box: {
          bulanan_master: "dashboard_kinerja/kinerja_box_bulanan_master",
          bulanan_rtu: "dashboard_kinerja/kinerja_box_bulanan_rtu",
          bulanan_rtu_bangka_belitung_bulan_ini:
            "dashboard/kinerja-scada/rtu/box-bulan-ini",
          bulanan_rtu_bangka_belitung_bulan_kemarin:
            "dashboard/kinerja-scada/rtu/box-bulan-kemarin",
          bulanan_rtu_bangka_belitung_bulan_komulatif:
            "dashboard/kinerja-scada/rtu/box-bulan-komulatif",
          bulanan_telkom: "dashboard_kinerja/kinerja_box_bulanan_telkom",
          bulanan_telkom_bangka_belitung_bulan_ini:
            "dashboard/kinerja-scada/telkom/box-bulan-ini",
          bulanan_telkom_bangka_belitung_bulan_kemarin:
            "dashboard/kinerja-scada/telkom/box-bulan-kemarin",
          bulanan_telkom_bangka_belitung_bulan_komulatif:
            "dashboard/kinerja-scada/telkom/box-bulan-komulatif",
          bulanan_rc: "dashboard_kinerja/kinerja_box_bulanan_rc",
          bulanan_rc_bulan_ini: "dashboard/kinerja-scada/rc/box-bulan-ini",
          bulanan_rc_bangka_belitung_bulan_kemarin:
            "dashboard/kinerja-scada/rc/box-bulan-kemarin",
          bulanan_rc_bangka_belitung_bulan_komulatif:
            "dashboard/kinerja-scada/rc/box-bulan-komulatif",
          // bulanan_rc: "dashboard_kinerja/kinerja_box_bulanan_rc",
          bulanan_telemetring:
            "dashboard_kinerja/kinerja_box_bulanan_telemetring",
          komulatif_master: "dashboard_kinerja/kinerja_box_komulatif_master",
          komulatif_rtu: "dashboard_kinerja/kinerja_box_komulatif_rtu",
          komulatif_telkom: "dashboard_kinerja/kinerja_box_komulatif_telkom",
          komulatif_rc: "dashboard_kinerja/kinerja_box_komulatif_rc",
          rtu_komplikasi: "dashboard/kinerja-scada/rtu/count",
          rtu_gh: "dashboard_kinerja/kinerja_box_rtu_gh",
          rtu_gi: "dashboard_kinerja/kinerja_box_rtu_gi",
          rtu_rcl: "dashboard_kinerja/kinerja_box_rtu_rcl",
          rtu_sso: "dashboard_kinerja/kinerja_box_rtu_sso",
          rtu_out: "dashboard_kinerja/kinerja_box_rtu_sso",
          rtu_out_pool: "dashboard_kinerja/kinerja_box_rtu_out_pool",
          rtu_in_pool: "dashboard_kinerja/kinerja_box_rtu_in_pool",
          rtu_out__off_pool: "dashboard_kinerja/kinerja_box_rtu_out__off_pool",
          count_rtu_ip: "dashboard/kinerja-scada/rtu/count-ip",
          count_rtu_oop: "dashboard/kinerja-scada/rtu/count-oop",
          list_oop: "dashboard/kinerja-scada/rtu/list-oop",
        },
      },
      kinerja_opsis: {
        beban_sistem_harian: "dashboard_kinerja_opsis/beban_sistem_harian",
        frekuensi: "dashboard_kinerja_opsis/frekuensi",
        beban_sistem: "dashboard_kinerja_opsis/beban_sistem",
        pembebanan_kopling: "main/dashboard_kinerja_opsis/pembebanan_kopling",
        pembebanan_feeder: "main/dashboard_kinerja_opsis/pembebanan_feeder",
        pembebanan_trafo: "main/dashboard_kinerja_opsis/pembebanan_trafo",
        tegangan_busbar: "dashboard_kinerja_opsis/tegangan_busbar",
        last_event: "dashboard_kinerja_opsis/last_event",
        scd_frek_rtl: "opsisdis/frekuensi/scd-frek-rtl",
      },
      kinerja_penyulang: "",
    },
    opsisdis: {
      pengukuran_beban: {
        pembangkit: "opsisdis/telemetring/pembangkit",
        pembangkit_total: "opsisdis/telemetring/pembangkit-total",
        pembangkit_col: "opsisdis/telemetring/pembangkit-col",
        pembangkit_col_total: "opsisdis/telemetring/pembangkit-col-total",
        penyulang: "opsisdis/telemetring/penyulang",
        penyulang_total: "opsisdis/telemetring/penyulang-total",
        penyulang_col_1phase: "opsisdis/telemetring/penyulang-col-1phase",
        penyulang_col: "opsisdis/telemetring/penyulang-col",
        penyulang_col_1phase_total:
          "opsisdis/telemetring/penyulang-col-1phase-total",
        penyulang_col_total: "opsisdis/telemetring/penyulang-col-total",
        gh: "opsisdis/telemetring/gardu-hubung",

        gh_col: "opsisdis/telemetring/gh-col",
        gh_col_total: "opsisdis/telemetring/gh-col-total",
        keypoint: "opsisdis/telemetring/keypoint",
        keypoint_col: "opsisdis/telemetring/kp-col",
        keypoint_col_total: "opsisdis/telemetring/kp-col-total",
        trafo_gi: "opsisdis/telemetring/trafo_gi",
        trafo_gi_total: "opsisdis/telemetring/trafo_gi-total",
        trafo_gi_col_1phase: "opsisdis/telemetring/trafo-gi-col-1phase",
        trafo_gi_col_3phase: "opsisdis/telemetring/trafo-gi-col-3phase",
        trafo_gi_col_1phase_total:
          "opsisdis/telemetring/trafo-gi-col-1phase-total",
        trafo_gi_col_3phase_total:
          "opsisdis/telemetring/trafo-gi-col-3phase-total",
        trafogi_col: "opsisdis/telemetring/trafogi-col",
        trafogi_col_total: "opsisdis/telemetring/trafogi-col-total",
        trafo_gi_ktt: "opsisdis/telemetring/trafo-gi-ktt",
        trafo_gi_ktt_total: "opsisdis/telemetring/trafo-gi-ktt-total",
        trafo_gi_ktt_col_1phase: "opsisdis/telemetring/trafo-gi-ktt-col-1phase",
        trafo_gi_ktt_col_3phase: "opsisdis/telemetring/trafo-gi-ktt-col-3phase",
        trafo_gi_ktt_col_1phase_total:
          "opsisdis/telemetring/trafo-gi-ktt-col-1phase-total",
        trafo_gi_ktt_col_3phase_total:
          "opsisdis/telemetring/trafo-gi-ktt-col-3phase-total",
        trafo_gi_non_ktt: "opsisdis/telemetring/trafo-gi-non-ktt",
        trafo_gi_non_ktt_total: "opsisdis/telemetring/trafo-gi-non-ktt-total",
        trafo_gi_non_ktt_col_1phase:
          "opsisdis/telemetring/trafo-gi-non-ktt-col-1phase",
        trafo_gi_non_ktt_col_3phase:
          "opsisdis/telemetring/trafo-gi-non-ktt-col-3phase",
        trafo_gi_non_ktt_col_1phase_total:
          "opsisdis/telemetring/trafo-gi-non-ktt-col-1phase-total",
        trafo_gi_non_ktt_col_3phase_total:
          "opsisdis/telemetring/trafo-gi-non-ktt-col-3phase-total",

        teg_trafo_gi_non_ktt: "opsisdis/telemetring/teg-trafo-gi",
        teg_trafo_gi_non_ktt_total: "opsisdis/telemetring/teg-trafo-gi-total",
        teg_trafo_gi_ktt: "opsisdis/telemetring/teg-trafo-gi-ktt",
        teg_trafo_gi_ktt_total: "opsisdis/telemetring/teg-trafo-gi-ktt-total",

        zone: "opsisdis/telemetring/zona",
        zone_total: "opsisdis/telemetring/zona-total",
        area: "opsisdis/telemetring/area",
        area_total: "opsisdis/telemetring/area-total",
        wilayah: "opsisdis/telemetring/wilayah",
        wilayah_total: "opsisdis/telemetring/wilayah-total",
        customer: "opsisdis/telemetring/amr-customer",
        energy: "opsisdis/telemetring/amr-energi",
        profile: "opsisdis/telemetring/amr-load-profile",
        DownloadLapBebanTeg: "opsisdis/telemetring/penyulang/download",
      },
      frequensi: {
        energi: "opsisdis/frekuensi/scd-frek-th",
        backup_harian: {
          list_directory: "opsisdis/frekuensi/backup-harian/list-directory",
          list_file: "opsisdis/frekuensi/backup-harian/list-file",
          download: "opsisdis/frekuensi/backup-harian/download-file",
        },
        ekskursi: {
          frequensi_harian: "opsisdis/frekuensi/backup-harian/list-file",
          threshold_harian: "opsisdis/frekuensi/backup-harian/list-file",
        },
      },
      ufr: "opsisdis/ufr/penyulang",
      sld: "opsisdis/sld",
      laporan_beban: {
        penyulang: {
          jam: "opsisdis/laporan/penyulang-jam",
          harian: "opsisdis/laporan/penyulang-hari",
          bulanan: "opsisdis/laporan/penyulang-bulan",
          tahunan: "opsisdis/laporan/penyulang-tahun",
        },
        trafo_gi: {
          jam: "opsisdis/laporan/trafo-gi-jam",
          harian: "opsisdis/laporan/trafo-gi-hari",
          bulanan: "opsisdis/laporan/trafo-gi-bulan",
          tahunan: "opsisdis/laporan/trafo-gi-tahun",
        },
        gardu_hubung: {
          jam: "opsisdis/laporan/gardu-hubung-jam",
          harian: "opsisdis/laporan/gardu-hubung-hari",
          bulanan: "opsisdis/laporan/gardu-hubung-bulan",
          tahunan: "opsisdis/laporan/gardu-hubung-tahun",
        },
        keypoint: {
          jam: "opsisdis/laporan/keypoint",
          harian: "opsisdis/laporan/keypoint-hari",
          bulanan: "opsisdis/laporan/keypoint-bulan",
          tahunan: "opsisdis/laporan/keypoint-tahun",
        },
        trafo_gi_5: {
          jam: "opsis/laporan-tegangan/trafo-gi-5m",
          harian: "opsis/laporan-tegangan/trafo-gi-5m-hari",
          bulanan: "opsis/laporan-tegangan/trafo-gi-5m-bulan",
          tahunan: "opsis/laporan-tegangan/trafo-gi-5m-tahun",
        },
        subsistem: {
          jam: "opsisdis/laporan/subsistem-jam",
          harian: "opsisdis/laporan/subsistem-hari",
          bulanan: "opsisdis/laporan/subsistem-bulan",
          tahunan: "opsisdis/laporan/subsistem-tahun",
        },
        uid: {
          jam: "opsisdis/laporan/unit-induk-jam",
          harian: "opsisdis/laporan/unit-induk-hari",
          bulanan: "opsisdis/laporan/unit-induk-bulan",
          tahunan: "opsisdis/laporan/unit-induk-tahun",
        },
        up2b: {
          jam: "opsisdis/laporan/up2b-jam",
          harian: "opsisdis/laporan/up2b-hari",
          bulanan: "opsisdis/laporan/up2b-bulan",
          tahunan: "opsisdis/laporan/up2b-tahun",
        },
        up3: {
          jam: "opsisdis/laporan/up3-jam",
          harian: "opsisdis/laporan/up3-hari",
          bulanan: "opsisdis/laporan/up3-bulan",
          tahunan: "opsisdis/laporan/up3-tahun",
        },
        pembangkit: {
          jam: "opsisdis/laporan/pembangkit-jam",
          harian: "opsisdis/laporan/pembangkit-hari",
          bulanan: "opsisdis/laporan/pembangkit-bulan",
          tahunan: "opsisdis/laporan/pembangkit-tahun",
        },
      },
      jadwal_pemeliharaan: {
        har: "opsisdis/jadwal-pemeliharaan/trans-jadwal-har",
        gardu: "opsisdis/jadwal-pemeliharaan/trans-jadwal-har-gardu",
        dok: "opsisdis/jadwal-pemeliharaan/trans-jadwal-har-dok",
      },
      dokumen: {
        kategori_dokumen: "opsisdis/dokumen/kategori-dokumen",
        kategori_dokumen_detail: "opsisdis//dokumen/kategori-dokumen-detail",
      },
      rekap_padam: {
        trans_ep: "opsisdis/rekap-padam/trans-ep",
        trans_gangguan: "opsisdis/gangguan/trans-gangguan-penyulang",
        trans_gangguan_sistem: "opsisdis/gangguan/trans-gangguan-sistem",
        detail_sistem: "opsisdis/gangguan/trans-gangguan-sistem-detail",
        fi: "opsisdis/gangguan/trans-gangguan-penyulang-fi",
        detail: "opsisdis/gangguan/trans-gangguan-penyulang-detail",
        ref_ep_indikasi: "master/opsisdis/ref-ep-indikasi",
        tranf_ep_peralatan: "opsisdis/rekap-padam/trans-ep/peralatan",
        trans_ep_peralatan2: "opsisdis/rekap-padam/trans-ep-peralatan",
        tranf_ep_peralatan_fiohl:
          "opsisdis/rekap-padam/trans-ep-peralatan-fiohl",
        tranf_ep_section: "opsisdis/rekap-padam/trans-ep-section",
        tranf_ep_laporan: "opsisdis/rekap-padam/trans-ep-laporan",
        tranf_ep_peralatan_detail:
          "opsisdis/rekap-padam/trans-ep/peralatan-detail/",
        ref_ep_cuaca: "master/opsisdis/ref-ep-cuaca",
        fai_arus_ggn_hmi:
          "opsisdis/rekap-padam/trans-ep/peralatan/fai-arus-ggn-hmi",
        view: "opsisdis/rekap-padam/views/trans-ep",
      },
      peta_listrik: "opsisdis/peta-listrik",
      peta_listrik_box: "opsisdis/peta-listrik/box",
      padam_penyulang: {
        total_ggn_bulan: "opsisdis/gangguan/pp-tg-bulan",
        total_lama_padam_penyulang: "opsisdis/gangguan/pp-tl-padam",
        lama_padam_penyulang_gangguan: "opsisdis/gangguan/pp-lm-gangguan",
        lama_padam_area: "opsisdis/gangguan/pp-lm-area",
        padam_5_menit: "opsisdis/gangguan/pp-padam5-menit",
        padam_5_menit_area: "opsisdis/gangguan/pp-padam5-max-menit",
        padam_kurang_5_menit_area: "opsisdis/gangguan/pp-padam5-min-menit",
        padam_trafo_penyulang: "opsisdis/gangguan/pp-trafo-penyulang",
      },
      gangguan_penyulang: {
        daftar_penyulang_padam: "opsisdis/gangguan/daftar_penyulang_padam",
        kali_trip_per_penyulang_per_bulan: "opsisdis/gangguan/kali_trip_per_penyulang_per_bulan",
        kali_trip_per_penyulang_per_tanggal: "opsisdis/gangguan/kali_trip_per_penyulang_per_tanggal",
        gangguan_penyulang_per_indikasi: "opsisdis/gangguan/gangguan_penyulang_per_indikasi",
        total_gangguan_per_area: "opsisdis/gangguan/total_gangguan_per_area",
        total_gangguan_per_gi: "opsisdis/gangguan/total_gangguan_per_gi",
        trip_bersamaan: "opsisdis/gangguan/trip_bersamaan",
        jumlah_gangguan_per_gi: "opsisdis/gangguan/jumlah_gangguan_per_gi",
        har_ggn_non_ggn: "opsisdis/gangguan/har_ggn_non_ggn",
      },
    },
    fasop: {
      laporan_scada: {
        pathtext: "fasop/laporan_scada/get_pathtext",
        path: "master/fasop/c-point/path",
        histori_rc: "fasop/laporan_scada/histori_rc",
        kinerja_rc: "fasop/laporan_scada/kinerja_rc",
        histori_peralatan_scada: "fasop/laporan_scada/histori_peralatan_scd",
        kinerja_peralatan_scada: "fasop/laporan_scada/kinerja_peralatan_scd",
        soe_alarm_proteksi: "fasop/laporan_scada/soe_alarm_proteksi",
        gangguan_peralatan_scada:
          "fasop/laporan_scada/gangguan_peralatan_scada",
        monitoring_proses: "admin/mon-proses",
        monitoring_keypoint: "fasop/laporan_scada/monitoring-keypoint",
        monitoring_keypoint_detail:
          "fasop/laporan_scada/monitoring-keypoint-detail",
        gangguan_peralatan_scada_box:
          "fasop/laporan_scada/gangguan_peralatan_scada/box",
      },
      laporan: {
        realtime: "fasop/scada/realtime",
        history: "fasop/scada/history",
        soe: "fasop/scada/soe",
      },
      telegram: {
        log: "master/fasop/telegram-log",
        tel_log: "master/fasop/telegram/log",
      },
      history: {
        telemetering: "fasop/spectrum/his/analog",
        telesignal: "fasop/scadatel/his/digital",
        rtu: "fasop/spectrum/his/rtu",
        analog: "fasop/histori/analog",
        analog_30m: "fasop/histori/analog_30m",
        digital: "fasop/histori/digital",
        master: "fasop/histori/master",
        trip: "fasop/histori/trip",
        rc: "fasop/histori/rc",
        soe: "fasop/scada/soe",
        scada_his: "fasop/scada/histori",
        jenis: "fasop/histori/get_jenis",
      },
      realtime: {
        rtu: "fasop/spectrum/rtl/rtu",
        master: "fasop/spectrum/rtl/master",
        scada_realtime: "fasop/scada/realtime",
        analog: "fasop/realtime/analog",
        soe: "fasop/histori/soe-temp",
        digital: "fasop/realtime/digital",
      },
      histele: {
        analog_5m: "fasop/histori/analog_5m",
        analog_30m: "fasop/histori/analog_30m",
      },
      drafting: {
        wo_drafting: "fasop/drafting/wo",
        persentase: "fasop/drafting/monitoring-wo/prosentase",
        monitoring_wo: "fasop/drafting/monitoring-wo",
        monitoring_wo_kinerja_spv: "fasop/drafting/monitoring-wo/kinerja-spv",
        monitoring_wo_pelaksana:
          "fasop/drafting/monitoring-wo/kinerja-pelaksana",
        ref_bagian: "master/fasop/ref-bagian",
        ref_kegiatan: "fasop/drafting/ref-kegiatan",
        get_nowo: "fasop/drafting/wo/get-nowo",
      },
      kinerja: {
        analog: "fasop/kinerja/analog",
        analog_hari: "fasop/kinerja/analog",
        analog_bulan: "fasop/spectrum/kin/analog-bulan",
        digital: "fasop/kinerja/digital",
        digital_hari: "fasop/kinerja/digital",
        rc: "fasop/kinerja/rc",
        trip: "fasop/kinerja/trip",
        digital_bulan: "fasop/spectrum/kin/digital-bulan",
        master_hari: "fasop/spectrum/kin/master-hari",
        master_bulan: "fasop/spectrum/kin/master-bulan",
        rtu_hari: "fasop/spectrum/kin/rtu-harian",
        rtu_bulan: "fasop/spectrum/kin/rtu-bulan",
      },
    },
    working_permit: {
      online: "working-permit/online",
      online_pekerja: "working-permit/online-pekerja",
      sop_jsa: "working-permit/master-sop-jsa",
      qrc: "working-permit/qrc",
      qrc_detail: "working-permit/qrc-detail",
      hirarc: "working-permit/hirarc",
      hirarc_detail: "working-permit/hirarc-detail",
    },
    apkt: {
      trans_jar: "opsisdis/apkt/apkt-trans-jar",
      trans_jar_box: "opsisdis/apkt/apkt-trans-jar/box",
      trans_jar_detail: "opsisdis/apkt/apkt-trans-jar-det",
      trans_jar_detail_batch:
        "opsisdis/apkt/apkt-trans-jar-det/update_apkt_batch",
      trans_jar_detail_padam: "opsisdis/apkt/apkt-trans-jar-det/padam",
      trans_jar_detail_nyala: "opsisdis/apkt/apkt-trans-jar-det/nyala",
      trans_log: "opsisdis/apkt/apkt-trans-log",
      trans_jar_har: "opsisdis/apkt/apkt-trans-jar-har",
      trans_jar_det_har_cek_status:
        "opsisdis/apkt/apkt-trans-jar-det-har/status",
      trans_jar_det_har: "opsisdis/apkt/apkt-trans-jar-det-har",
      monitoring_gardu_status: "opsisdis/apkt/monitoring-status-gardu",
      monitoring_gardu_status_detail:
        "opsisdis/apkt/monitoring-status-gardu-detail",
      his_10_anat: "opsisdis/apkt/his-10-anat",
      his_11_digitalt: "opsisdis/apkt/his-11-digitalt",
      apkt_integrasi_mon: "opsisdis/apkt/apkt-intergrasi-mon",
    },
    eam: {
      eam_trans_aset_mutasi: "eam/trans-aset-mutasi",
      eam_trans_wo: "eam/trans-wo",
    },
    master: {
      adm_wilayah: {
        provinsi: "master/wilayah/ref-province",
        kota_kab: "master/wilayah/ref-regency",
        kecamatan: "master/wilayah/ref-district",
      },
      jaringan: {
        ref_lokasi: "master/jaringan/ref-lokasi",
        ref_lokasi_gd: "master/jaringan/ref-lokasi-gd",
        ref_lokasi_batch: "master/jaringan/ref-lokasi/update_batch",
        tree_jaringan: "master/jaringan/tree-jaringan",
        jenis_pembangkit: "master/jaringan/ref-jenis-pembangkit",
        id_pemilik: "master/jaringan/ref-pemilik-jaringan",
        pelanggan_vip: "master/jaringan/ref-pelanggan-vip",
      },
      aset: {
        ref_aset: "master/aset/ref-aset",
        ref_aset_jenis: "master/aset/ref-aset-jenis",
        ref_aset_lantai: "master/aset/ref-aset-lantai",
        ref_aset_ruangan: "master/aset/ref-aset-ruangan",
        ref_aset_rak: "master/aset/ref-aset-rak",
        ref_aset_status: "master/aset/ref-aset-status",
        ref_aset_kondisi: "master/aset/ref-aset-kondisi",
        ref_aset_level: "master/aset/ref-aset-level",
        ref_aset_manufaktur: "master/aset/ref-aset-manufaktur",
        ref_aset_ext_atr: "master/aset/ref-aset-ext-atr",
      },
      eam: {
        eam_ref_aset: "master/eam/aset",
        eam_ref_aset_ext_atr: "master/eam/aset-ext-atr",
        eam_ref_aset_status: "master/eam/aset-status",
        eam_ref_aset_kondisi: "master/eam/aset-kondisi",
        eam_ref_aset_lantai: "master/eam/aset-lantai",
        eam_ref_aset_ruangan: "master/eam/aset-ruangan",
        eam_ref_aset_rak: "master/eam/aset-rak",
        eam_ref_aset_manufaktur: "master/eam/aset-manufaktur",
        eam_ref_aset_group: "master/eam/aset-group",
        eam_ref_aset_kategori: "master/eam/aset-kategori",
        eam_ref_aset_kategori_ext_atr: "master/eam/aset-kategori-ext-atr",
        eam_ref_jenis_mutasi: "master/eam/jenis-mutasi",
        eam_ref_status_mutasi: "master/eam/status-mutasi",
        eam_ref_health_index: "master/eam/health-index",
        eam_ref_bagian: "master/eam/bagian",
        eam_ref_bobot_prioritas: "master/eam/bobot-prioritas",
        eam_ref_group_har: "master/eam/group-har",
      },
      working_permit: {
        bagian: "master/working-permit/bagian",
        pertanyaan_qrc: "master/working-permit/pertanyaan-qrc",
        risk_point_qrc: "master/working-permit/risk-point-qrc",
        larangan_tanggung_jawab_qrc:
          "master/working-permit/larangan-tanggung-jawab-mitra",
        approval_management_wp: "master/working-permit/approval-management-wp",
        kel_keselamatan: "master/working-permit/kel-keselamatan",
        kel_pekerjaan: "master/working-permit/kel-pekerjaan",
      },
      admin_ksa: {
        jabatan: "master/pegawai/jabatan",
        departemen: "master/pegawai/departemen",
        perusahaan: "master/pegawai/perusahaan",
        regu_petugas: "master/pegawai/regu-petugas",
        petugas_regu: "users/regu",
      },
      external: {
        usertoken: "master/external/ext-user-token",
        extmodule: "master/external/ext-module",
        user_token_role: "master/external/ext-user-token-role",
      },
      opsisdis: {
        jenis_penyebab_gangguan: "master/opsisdis/jenis-penyebab-gangguan",
        penyebab_gangguan: "master/opsisdis/penyebab-gangguan",
        frequensi: "master/opsisdis/frekuensi-meter",
        customer: "master/opsisdis/amr-customer",
        pm: {
          ref_pm: "master/opsisdis/pm/ref-pm",
          ref_pm_detail: "master/opsisdis/pm/ref-pm-detail",
          ref_pm_detail_logic: "master/opsisdis/pm/ref-pm-detail-logic",
        },
        jadwal_pemeliharaan: {
          jenis_pekerjaan: "master/opsisdis/ref-jenis-pekerjaan",
        },
        rekap_padam: {
          indikasi: "master/opsisdis/ref-ep-indikasi",
          fiohl: "master/opsisdis/ref-ep-fiohl",
          fai_mtrz: "master/opsisdis/ref-ep-fai-mtrz",
          ag_hmi: "master/opsisdis/ref-ep-ag-hmi",
          cuaca: "master/opsisdis/ref-ep-cuaca",
          fdir: "master/opsisdis/ref-ep-fdir",
          status_proteksi: "master/opsisdis/ref-ep-status-proteksi",
          penyebab_gangguan: "master/opsisdis/ref-ep-penyebab-ggn",
          kategori_gangguan: "master/opsisdis/ref-ep-kat-ggn",
          ref_ep_petugas: "master/opsisdis/ref-ep-petugas",
          recloser: "opsisdis/rekap-padam/views/recloser",
          penyulang_gi: "opsisdis/rekap-padam/views/penyulang-gi",
          penyulang_gh: "opsisdis/rekap-padam/views/penyulang-gh",
          motorized: "opsisdis/rekap-padam/views/motorized",
        },
      },
      fasop: {
        sistem_scada: "master/fasop/sistem-scada",
        path1: "master/fasop/path-1",
        path3: "master/fasop/path-3",
        pm: "master/fasop/pm",
        master: "master/fasop/master",
        c_point: "master/fasop/c-point",
        path: "master/fasop/c-point/path",
        point_type: "master/fasop/point-type",
        point_type_state: "master/fasop/point-type-state",
        rtu: "master/fasop/rtu",
        telegram_bot: "master/fasop/telegram-bot",
        tel_bot: "master/fasop/telegram/bot",
        tel_kontak: "master/fasop/telegram/kontak",
        telegram_group: "master/fasop/telegram-group",
        tel_group: "master/fasop/telegram/group",
        tel_kontak_group: "master/fasop/telegram/kontak-group",
        point_type_get: "master/fasop/point-type-get",
        kinerja_scada: "master/fasop/kinerja-scada",
        whatsapp: {
          bot: "master/fasop/whatsapp/bot",
          group: "master/fasop/whatsapp/group",
          kontak: "master/fasop/whatsapp/kontak",
          kontak_group: "master/fasop/whatsapp/kontak-group",
          log: "master/fasop/whatsapp/whatsapp-log",
          message: "master/fasop/whatsapp/wa-message",
          kirim: "master/fasop/whatsapp/whatsapp-log",
        },
      },
      management_upload: {
        unit_pembangkit: "master/management-upload/unit-pembangkit",
        pembangkit: "master/management-upload/pembangkit",
        gardu_induk: "master/management-upload/gardu-induk",
        trafo_gi: "master/management-upload/trafo-gi",
        penyulang: "master/management-upload/penyulang",
        zone: "master/management-upload/zona",
        section: "master/management-upload/section",
        segment: "master/management-upload/segment",
        gardu_distribusi: "master/management-upload/gardu-distribusi",
        trafo_gd: "master/management-upload/trafo-gardu-distribusi",
        gardu_hubung: "",
        kantor: "",
        temp: "master/management-upload/temp",
      },
    },
    appsettings: "admin/app-settings",
  };
};
