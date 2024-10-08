export function CeilBackgroundPengukuranBeban(
  row: any,
  column: any,
  value: any,
  data: any
) {
  switch (column) {
    case "i":
      if (data.sinkron_data == null && value != null) {
        return data.sinkron_data == "SCADA"
          ? "bg-disgust text-right text-black"
          : " text-black text-right";
      } else if (data.sinkron_data == "SCADA" || data.sinkron_data == "AMR") {
        return data.sinkron_data == "SCADA"
          ? "bg-trust text-right text-black"
          : " text-right";
      } else if (
        data.sinkron_data == "SCADA" ||
        (data.sinkron_data == "AMR" && data?.i > data.i_max)
      ) {
        return data.sinkron_data == "SCADA"
          ? "bg-anger text-right text-black"
          : " text-right";
      } else if (
        (data.sinkron_data == "SCADA" || data.sinkron_data == "AMR") &&
        data.id_user_update != null
      ) {
        return data.sinkron_data == "SCADA"
          ? "bg-joy text-right text-black"
          : " text-right";
      } else if (
        data.sinkron_data == "SCADA" ||
        (data.sinkron_data == "AMR" && data.i < 0)
      ) {
        return data.sinkron_data == "SCADA"
          ? "bg-anticipation text-right text-black"
          : " text-right";
      } else {
        return "bg-disgust";
      }
    case "p":
      if (data.sinkron_data == null && value != null) {
        return data.sinkron_data == "SCADA"
          ? "bg-disgust text-right text-black"
          : " text-right";
      } else if (data.sinkron_data == "SCADA" || data.sinkron_data == "AMR") {
        return data.sinkron_data == "SCADA"
          ? "bg-trust text-right text-black"
          : " text-right";
      } else if (
        data.sinkron_data == "SCADA" ||
        (data.sinkron_data == "AMR" && data?.i > data.i_max)
      ) {
        return data.sinkron_data == "SCADA"
          ? "bg-anger text-right text-black"
          : " text-right";
      } else if (
        (data.sinkron_data == "SCADA" || data.sinkron_data == "AMR") &&
        data.id_user_update != null
      ) {
        return data.sinkron_data == "SCADA"
          ? "bg-joy text-right text-black"
          : " text-right";
      } else if (
        data.sinkron_data == "SCADA" ||
        (data.sinkron_data == "AMR" && data.i < 0)
      ) {
        return data.sinkron_data == "SCADA"
          ? "bg-anticipation text-right text-black"
          : " text-right";
      }
      break;
    case "v":
      if (data.sinkron_data == null && value != null) {
        return data.sinkron_data == "SCADA"
          ? "bg-disgust text-right text-black"
          : " text-right";
      } else if (data.sinkron_data == "SCADA" || data.sinkron_data == "AMR") {
        return data.sinkron_data == "SCADA"
          ? "bg-trust text-right text-black"
          : " text-right";
      } else if (
        data.sinkron_data == "SCADA" ||
        (data.sinkron_data == "AMR" && data?.i > data.i_max)
      ) {
        return data.sinkron_data == "SCADA"
          ? "bg-anger text-right text-black"
          : " text-right";
      } else if (
        (data.sinkron_data == "SCADA" || data.sinkron_data == "AMR") &&
        data.id_user_update != null
      ) {
        return data.sinkron_data == "SCADA"
          ? "bg-joy text-right text-black"
          : " text-right";
      } else if (
        data.sinkron_data == "SCADA" ||
        (data.sinkron_data == "AMR" && data.i < 0)
      ) {
        return data.sinkron_data == "SCADA"
          ? "bg-anticipation text-right text-black"
          : " text-right";
      }
      break;

    default:
      return "bg-operator";
  }
}

export const cellclassname = (row: any, column: any, value: any, data: any) => {
  row;
  column;
  value;
  data;
  // console.log("row", row);
  // console.log("column", column);
  // console.log("value", value);
  // console.log("data", data);

  return "red";
};

export function CeilBackgroundPengukuranBebanNew(
  row: any,
  column: any,
  value: any,
  data: any
) {
  /*
pengisian kolom sc :
    0 / NULL = BELUM DIUPDATE
    1 = SUMBER DARI SCADA/AMR
    2 = SUMBER DARI ENTRI OPERATOR
    3 = SUMBER DARI SCADA/AMR DIUPDATE OPERATOR
  */
  const bg0 = "bg-operator text-right text-black";
  const bg1 = "bg-trust text-right text-black";
  const bg2 = "bg-joy text-right text-black";
  const bg3 = "bg-surprise text-right text-black";
  const bg4 = "bg-operator";
  switch (column) {
    case "i0000":
      if (data.sc0000 == "0") {
        return bg0;
      } else if (data.sc0000 == "1") {
        return bg1;
      } else if (data.sc0000 == "2") {
        return bg2;
      } else if (data.sc0000 == "3") {
        return bg3;
      }
      break;

    case "i0030":
      if (data.sc0030 == "0") {
        return bg0;
      } else if (data.sc0030 == "1") {
        return bg1;
      } else if (data.sc0030 == "2") {
        return bg2;
      } else if (data.sc0030 == "3") {
        return bg3;
      }
      break;

    case "i0100":
      if (data.sc0100 == "0") {
        return bg0;
      } else if (data.sc0100 == "1") {
        return bg1;
      } else if (data.sc0100 == "2") {
        return bg2;
      } else if (data.sc0100 == "3") {
        return bg3;
      }
      break;

    case "i0130":
      if (data.sc0130 == "0") {
        return bg0;
      } else if (data.sc0130 == "1") {
        return bg1;
      } else if (data.sc0130 == "2") {
        return bg2;
      } else if (data.sc0130 == "3") {
        return bg3;
      }
      break;

    case "i0200":
      if (data.sc0200 == "0") {
        return bg0;
      } else if (data.sc0200 == "1") {
        return bg1;
      } else if (data.sc0200 == "2") {
        return bg2;
      } else if (data.sc0200 == "3") {
        return bg3;
      }
      break;

    case "i0230":
      if (data.sc0230 == "0") {
        return bg0;
      } else if (data.sc0230 == "1") {
        return bg1;
      } else if (data.sc0230 == "2") {
        return bg2;
      } else if (data.sc0230 == "3") {
        return bg3;
      }
      break;

    case "i0300":
      if (data.sc0300 == "0") {
        return bg0;
      } else if (data.sc0300 == "1") {
        return bg1;
      } else if (data.sc0300 == "2") {
        return bg2;
      } else if (data.sc0300 == "3") {
        return bg3;
      }
      break;

    case "i0330":
      if (data.sc0330 == "0") {
        return bg0;
      } else if (data.sc0330 == "1") {
        return bg1;
      } else if (data.sc0330 == "2") {
        return bg2;
      } else if (data.sc0330 == "3") {
        return bg3;
      }
      break;
    case "i0400":
      if (data.sc0400 == "0") {
        return bg0;
      } else if (data.sc0400 == "1") {
        return bg1;
      } else if (data.sc0400 == "2") {
        return bg2;
      } else if (data.sc0400 == "3") {
        return bg3;
      }
      break;

    case "i0430":
      if (data.sc0430 == "0") {
        return bg0;
      } else if (data.sc0430 == "1") {
        return bg1;
      } else if (data.sc0430 == "2") {
        return bg2;
      } else if (data.sc0430 == "3") {
        return bg3;
      }
      break;

    case "i0500":
      if (data.sc0500 == "0") {
        return bg0;
      } else if (data.sc0500 == "1") {
        return bg1;
      } else if (data.sc0500 == "2") {
        return bg2;
      } else if (data.sc0500 == "3") {
        return bg3;
      }
      break;

    case "i0530":
      if (data.sc0530 == "0") {
        return bg0;
      } else if (data.sc0530 == "1") {
        return bg1;
      } else if (data.sc0530 == "2") {
        return bg2;
      } else if (data.sc0530 == "3") {
        return bg3;
      }
      break;

    case "i0600":
      if (data.sc0600 == "0") {
        return bg0;
      } else if (data.sc0600 == "1") {
        return bg1;
      } else if (data.sc0600 == "2") {
        return bg2;
      } else if (data.sc0600 == "3") {
        return bg3;
      }
      break;

    case "i0630":
      if (data.sc0630 == "0") {
        return bg0;
      } else if (data.sc0630 == "1") {
        return bg1;
      } else if (data.sc0630 == "2") {
        return bg2;
      } else if (data.sc0630 == "3") {
        return bg3;
      }
      break;

    case "i0700":
      if (data.sc0700 == "0") {
        return bg0;
      } else if (data.sc0700 == "1") {
        return bg1;
      } else if (data.sc0700 == "2") {
        return bg2;
      } else if (data.sc0700 == "3") {
        return bg3;
      }
      break;

    case "i0730":
      if (data.sc0730 == "0") {
        return bg0;
      } else if (data.sc0730 == "1") {
        return bg1;
      } else if (data.sc0730 == "2") {
        return bg2;
      } else if (data.sc0730 == "3") {
        return bg3;
      }
      break;

    case "i0800":
      if (data.sc0800 == "0") {
        return bg0;
      } else if (data.sc0800 == "1") {
        return bg1;
      } else if (data.sc0800 == "2") {
        return bg2;
      } else if (data.sc0800 == "3") {
        return bg3;
      }
      break;

    case "i0830":
      if (data.sc0830 == "0") {
        return bg0;
      } else if (data.sc0830 == "1") {
        return bg1;
      } else if (data.sc0830 == "2") {
        return bg2;
      } else if (data.sc0830 == "3") {
        return bg3;
      }
      break;

    case "i0900":
      if (data.sc0900 == "0") {
        return bg0;
      } else if (data.sc0900 == "1") {
        return bg1;
      } else if (data.sc0900 == "2") {
        return bg2;
      } else if (data.sc0900 == "3") {
        return bg3;
      }
      break;

    case "i0930":
      if (data.sc0930 == "0") {
        return bg0;
      } else if (data.sc0930 == "1") {
        return bg1;
      } else if (data.sc0930 == "2") {
        return bg2;
      } else if (data.sc0930 == "3") {
        return bg3;
      }
      break;

    case "i1000":
      if (data.sc1000 == "0") {
        return bg0;
      } else if (data.sc1000 == "1") {
        return bg1;
      } else if (data.sc1000 == "2") {
        return bg2;
      } else if (data.sc1000 == "3") {
        return bg3;
      }
      break;

    case "i1030":
      if (data.sc1030 == "0") {
        return bg0;
      } else if (data.sc1030 == "1") {
        return bg1;
      } else if (data.sc1030 == "2") {
        return bg2;
      } else if (data.sc1030 == "3") {
        return bg3;
      }
      break;

    case "i1100":
      if (data.sc1100 == "0") {
        return bg0;
      } else if (data.sc1100 == "1") {
        return bg1;
      } else if (data.sc1100 == "2") {
        return bg2;
      } else if (data.sc1100 == "3") {
        return bg3;
      }
      break;

    case "i1130":
      if (data.sc1130 == "0") {
        return bg0;
      } else if (data.sc1130 == "1") {
        return bg1;
      } else if (data.sc1130 == "2") {
        return bg2;
      } else if (data.sc1130 == "3") {
        return bg3;
      }
      break;

    case "i1200":
      if (data.sc1200 == "0") {
        return bg0;
      } else if (data.sc1200 == "1") {
        return bg1;
      } else if (data.sc1200 == "2") {
        return bg2;
      } else if (data.sc1200 == "3") {
        return bg3;
      }
      break;

    case "i1230":
      if (data.sc1230 == "0") {
        return bg0;
      } else if (data.sc1230 == "1") {
        return bg1;
      } else if (data.sc1230 == "2") {
        return bg2;
      } else if (data.sc1230 == "3") {
        return bg3;
      }
      break;

    case "i1300":
      if (data.sc1300 == "0") {
        return bg0;
      } else if (data.sc1300 == "1") {
        return bg1;
      } else if (data.sc1300 == "2") {
        return bg2;
      } else if (data.sc1300 == "3") {
        return bg3;
      }
      break;

    case "i1330":
      if (data.sc1330 == "0") {
        return bg0;
      } else if (data.sc1330 == "1") {
        return bg1;
      } else if (data.sc1330 == "2") {
        return bg2;
      } else if (data.sc1330 == "3") {
        return bg3;
      }
      break;

    case "i1400":
      if (data.sc1400 == "0") {
        return bg0;
      } else if (data.sc1400 == "1") {
        return bg1;
      } else if (data.sc1400 == "2") {
        return bg2;
      } else if (data.sc1400 == "3") {
        return bg3;
      }
      break;

    case "i1430":
      if (data.sc1430 == "0") {
        return bg0;
      } else if (data.sc1430 == "1") {
        return bg1;
      } else if (data.sc1430 == "2") {
        return bg2;
      } else if (data.sc1430 == "3") {
        return bg3;
      }
      break;

    case "i1500":
      if (data.sc1500 == "0") {
        return bg0;
      } else if (data.sc1500 == "1") {
        return bg1;
      } else if (data.sc1500 == "2") {
        return bg2;
      } else if (data.sc1500 == "3") {
        return bg3;
      }
      break;

    case "i1530":
      if (data.sc1530 == "0") {
        return bg0;
      } else if (data.sc1530 == "1") {
        return bg1;
      } else if (data.sc1530 == "2") {
        return bg2;
      } else if (data.sc1530 == "3") {
        return bg3;
      }
      break;

    case "i1600":
      if (data.sc1600 == "0") {
        return bg0;
      } else if (data.sc1600 == "1") {
        return bg1;
      } else if (data.sc1600 == "2") {
        return bg2;
      } else if (data.sc1600 == "3") {
        return bg3;
      }
      break;

    case "i1630":
      if (data.sc1630 == "0") {
        return bg0;
      } else if (data.sc1630 == "1") {
        return bg1;
      } else if (data.sc1630 == "2") {
        return bg2;
      } else if (data.sc1630 == "3") {
        return bg3;
      }
      break;

    case "i1700":
      if (data.sc1700 == "0") {
        return bg0;
      } else if (data.sc1700 == "1") {
        return bg1;
      } else if (data.sc1700 == "2") {
        return bg2;
      } else if (data.sc1700 == "3") {
        return bg3;
      }
      break;

    case "i1730":
      if (data.sc1730 == "0") {
        return bg0;
      } else if (data.sc1730 == "1") {
        return bg1;
      } else if (data.sc1730 == "2") {
        return bg2;
      } else if (data.sc1730 == "3") {
        return bg3;
      }
      break;

    case "i1800":
      if (data.sc1800 == "0") {
        return bg0;
      } else if (data.sc1800 == "1") {
        return bg1;
      } else if (data.sc1800 == "2") {
        return bg2;
      } else if (data.sc1800 == "3") {
        return bg3;
      }
      break;

    case "i1830":
      if (data.sc1830 == "0") {
        return bg0;
      } else if (data.sc1830 == "1") {
        return bg1;
      } else if (data.sc1830 == "2") {
        return bg2;
      } else if (data.sc1830 == "3") {
        return bg3;
      }
      break;

    case "i1900":
      if (data.sc1900 == "0") {
        return bg0;
      } else if (data.sc1830 == "1") {
        return bg1;
      } else if (data.sc1830 == "2") {
        return bg2;
      } else if (data.sc1830 == "3") {
        return bg3;
      }
      break;
    case "i1930":
      if (data.sc1930 == "0") {
        return bg0;
      } else if (data.sc1930 == "1") {
        return bg1;
      } else if (data.sc1930 == "2") {
        return bg2;
      } else if (data.sc1930 == "3") {
        return bg3;
      }
      break;

    case "i2000":
      if (data.sc2000 == "0") {
        return bg0;
      } else if (data.sc2000 == "1") {
        return bg1;
      } else if (data.sc2000 == "2") {
        return bg2;
      } else if (data.sc2000 == "3") {
        return bg3;
      }
      break;

    case "i2030":
      if (data.sc2030 == "0") {
        return bg0;
      } else if (data.sc2030 == "1") {
        return bg1;
      } else if (data.sc2030 == "2") {
        return bg2;
      } else if (data.sc2030 == "3") {
        return bg3;
      }
      break;

    case "i2100":
      if (data.sc2100 == "0") {
        return bg0;
      } else if (data.sc2100 == "1") {
        return bg1;
      } else if (data.sc2100 == "2") {
        return bg2;
      } else if (data.sc2100 == "3") {
        return bg3;
      }
      break;

    case "i2130":
      if (data.sc2130 == "0") {
        return bg0;
      } else if (data.sc2130 == "1") {
        return bg1;
      } else if (data.sc2130 == "2") {
        return bg2;
      } else if (data.sc2130 == "3") {
        return bg3;
      }
      break;

    case "i2200":
      if (data.sc2200 == "0") {
        return bg0;
      } else if (data.sc2200 == "1") {
        return bg1;
      } else if (data.sc2200 == "2") {
        return bg2;
      } else if (data.sc2200 == "3") {
        return bg3;
      }
      break;

    case "i2230":
      if (data.sc2230 == "0") {
        return bg0;
      } else if (data.sc2230 == "1") {
        return bg1;
      } else if (data.sc2230 == "2") {
        return bg2;
      } else if (data.sc2230 == "3") {
        return bg3;
      }
      break;

    case "i2300":
      if (data.sc2300 == "0") {
        return bg0;
      } else if (data.sc2300 == "1") {
        return bg1;
      } else if (data.sc2300 == "2") {
        return bg2;
      } else if (data.sc2300 == "3") {
        return bg3;
      }
      break;

    case "i2330":
      if (data.sc2330 == "0") {
        return bg0;
      } else if (data.sc2330 == "1") {
        return bg1;
      } else if (data.sc2330 == "2") {
        return bg2;
      } else if (data.sc2330 == "3") {
        return bg3;
      }
      break;

    case "r0000":
      if (data.sc0000 == "0") {
        return bg0;
      } else if (data.sc0000 == "1") {
        return bg1;
      } else if (data.sc0000 == "2") {
        return bg2;
      } else if (data.sc0000 == "3") {
        return bg3;
      }
      break;

    case "r0030":
      if (data.sc0030 == "0") {
        return bg0;
      } else if (data.sc0030 == "1") {
        return bg1;
      } else if (data.sc0030 == "2") {
        return bg2;
      } else if (data.sc0030 == "3") {
        return bg3;
      }
      break;

    case "r0100":
      if (data.sc0100 == "0") {
        return bg0;
      } else if (data.sc0100 == "1") {
        return bg1;
      } else if (data.sc0100 == "2") {
        return bg2;
      } else if (data.sc0100 == "3") {
        return bg3;
      }
      break;

    case "r0130":
      if (data.sc0130 == "0") {
        return bg0;
      } else if (data.sc0130 == "1") {
        return bg1;
      } else if (data.sc0130 == "2") {
        return bg2;
      } else if (data.sc0130 == "3") {
        return bg3;
      }
      break;

    case "r0200":
      if (data.sc0200 == "0") {
        return bg0;
      } else if (data.sc0200 == "1") {
        return bg1;
      } else if (data.sc0200 == "2") {
        return bg2;
      } else if (data.sc0200 == "3") {
        return bg3;
      }
      break;

    case "r0230":
      if (data.sc0230 == "0") {
        return bg0;
      } else if (data.sc0230 == "1") {
        return bg1;
      } else if (data.sc0230 == "2") {
        return bg2;
      } else if (data.sc0230 == "3") {
        return bg3;
      }
      break;

    case "r0300":
      if (data.sc0300 == "0") {
        return bg0;
      } else if (data.sc0300 == "1") {
        return bg1;
      } else if (data.sc0300 == "2") {
        return bg2;
      } else if (data.sc0300 == "3") {
        return bg3;
      }
      break;

    case "r0330":
      if (data.sc0330 == "0") {
        return bg0;
      } else if (data.sc0330 == "1") {
        return bg1;
      } else if (data.sc0330 == "2") {
        return bg2;
      } else if (data.sc0330 == "3") {
        return bg3;
      }
      break;
    case "r0400":
      if (data.sc0400 == "0") {
        return bg0;
      } else if (data.sc0400 == "1") {
        return bg1;
      } else if (data.sc0400 == "2") {
        return bg2;
      } else if (data.sc0400 == "3") {
        return bg3;
      }
      break;

    case "r0430":
      if (data.sc0430 == "0") {
        return bg0;
      } else if (data.sc0430 == "1") {
        return bg1;
      } else if (data.sc0430 == "2") {
        return bg2;
      } else if (data.sc0430 == "3") {
        return bg3;
      }
      break;

    case "r0500":
      if (data.sc0500 == "0") {
        return bg0;
      } else if (data.sc0500 == "1") {
        return bg1;
      } else if (data.sc0500 == "2") {
        return bg2;
      } else if (data.sc0500 == "3") {
        return bg3;
      }
      break;

    case "r0530":
      if (data.sc0530 == "0") {
        return bg0;
      } else if (data.sc0530 == "1") {
        return bg1;
      } else if (data.sc0530 == "2") {
        return bg2;
      } else if (data.sc0530 == "3") {
        return bg3;
      }
      break;

    case "r0600":
      if (data.sc0600 == "0") {
        return bg0;
      } else if (data.sc0600 == "1") {
        return bg1;
      } else if (data.sc0600 == "2") {
        return bg2;
      } else if (data.sc0600 == "3") {
        return bg3;
      }
      break;

    case "r0630":
      if (data.sc0630 == "0") {
        return bg0;
      } else if (data.sc0630 == "1") {
        return bg1;
      } else if (data.sc0630 == "2") {
        return bg2;
      } else if (data.sc0630 == "3") {
        return bg3;
      }
      break;

    case "r0700":
      if (data.sc0700 == "0") {
        return bg0;
      } else if (data.sc0700 == "1") {
        return bg1;
      } else if (data.sc0700 == "2") {
        return bg2;
      } else if (data.sc0700 == "3") {
        return bg3;
      }
      break;

    case "r0730":
      if (data.sc0730 == "0") {
        return bg0;
      } else if (data.sc0730 == "1") {
        return bg1;
      } else if (data.sc0730 == "2") {
        return bg2;
      } else if (data.sc0730 == "3") {
        return bg3;
      }
      break;

    case "r0800":
      if (data.sc0800 == "0") {
        return bg0;
      } else if (data.sc0800 == "1") {
        return bg1;
      } else if (data.sc0800 == "2") {
        return bg2;
      } else if (data.sc0800 == "3") {
        return bg3;
      }
      break;

    case "r0830":
      if (data.sc0830 == "0") {
        return bg0;
      } else if (data.sc0830 == "1") {
        return bg1;
      } else if (data.sc0830 == "2") {
        return bg2;
      } else if (data.sc0830 == "3") {
        return bg3;
      }
      break;

    case "r0900":
      if (data.sc0900 == "0") {
        return bg0;
      } else if (data.sc0900 == "1") {
        return bg1;
      } else if (data.sc0900 == "2") {
        return bg2;
      } else if (data.sc0900 == "3") {
        return bg3;
      }
      break;

    case "r0930":
      if (data.sc0930 == "0") {
        return bg0;
      } else if (data.sc0930 == "1") {
        return bg1;
      } else if (data.sc0930 == "2") {
        return bg2;
      } else if (data.sc0930 == "3") {
        return bg3;
      }
      break;

    case "r1000":
      if (data.sc1000 == "0") {
        return bg0;
      } else if (data.sc1000 == "1") {
        return bg1;
      } else if (data.sc1000 == "2") {
        return bg2;
      } else if (data.sc1000 == "3") {
        return bg3;
      }
      break;

    case "r1030":
      if (data.sc1030 == "0") {
        return bg0;
      } else if (data.sc1030 == "1") {
        return bg1;
      } else if (data.sc1030 == "2") {
        return bg2;
      } else if (data.sc1030 == "3") {
        return bg3;
      }
      break;

    case "r1100":
      if (data.sc1100 == "0") {
        return bg0;
      } else if (data.sc1100 == "1") {
        return bg1;
      } else if (data.sc1100 == "2") {
        return bg2;
      } else if (data.sc1100 == "3") {
        return bg3;
      }
      break;

    case "r1130":
      if (data.sc1130 == "0") {
        return bg0;
      } else if (data.sc1130 == "1") {
        return bg1;
      } else if (data.sc1130 == "2") {
        return bg2;
      } else if (data.sc1130 == "3") {
        return bg3;
      }
      break;

    case "r1200":
      if (data.sc1200 == "0") {
        return bg0;
      } else if (data.sc1200 == "1") {
        return bg1;
      } else if (data.sc1200 == "2") {
        return bg2;
      } else if (data.sc1200 == "3") {
        return bg3;
      }
      break;

    case "r1230":
      if (data.sc1230 == "0") {
        return bg0;
      } else if (data.sc1230 == "1") {
        return bg1;
      } else if (data.sc1230 == "2") {
        return bg2;
      } else if (data.sc1230 == "3") {
        return bg3;
      }
      break;

    case "r1300":
      if (data.sc1300 == "0") {
        return bg0;
      } else if (data.sc1300 == "1") {
        return bg1;
      } else if (data.sc1300 == "2") {
        return bg2;
      } else if (data.sc1300 == "3") {
        return bg3;
      }
      break;

    case "r1330":
      if (data.sc1330 == "0") {
        return bg0;
      } else if (data.sc1330 == "1") {
        return bg1;
      } else if (data.sc1330 == "2") {
        return bg2;
      } else if (data.sc1330 == "3") {
        return bg3;
      }
      break;

    case "r1400":
      if (data.sc1400 == "0") {
        return bg0;
      } else if (data.sc1400 == "1") {
        return bg1;
      } else if (data.sc1400 == "2") {
        return bg2;
      } else if (data.sc1400 == "3") {
        return bg3;
      }
      break;

    case "r1430":
      if (data.sc1430 == "0") {
        return bg0;
      } else if (data.sc1430 == "1") {
        return bg1;
      } else if (data.sc1430 == "2") {
        return bg2;
      } else if (data.sc1430 == "3") {
        return bg3;
      }
      break;

    case "r1500":
      if (data.sc1500 == "0") {
        return bg0;
      } else if (data.sc1500 == "1") {
        return bg1;
      } else if (data.sc1500 == "2") {
        return bg2;
      } else if (data.sc1500 == "3") {
        return bg3;
      }
      break;

    case "r1530":
      if (data.sc1530 == "0") {
        return bg0;
      } else if (data.sc1530 == "1") {
        return bg1;
      } else if (data.sc1530 == "2") {
        return bg2;
      } else if (data.sc1530 == "3") {
        return bg3;
      }
      break;

    case "r1600":
      if (data.sc1600 == "0") {
        return bg0;
      } else if (data.sc1600 == "1") {
        return bg1;
      } else if (data.sc1600 == "2") {
        return bg2;
      } else if (data.sc1600 == "3") {
        return bg3;
      }
      break;

    case "r1630":
      if (data.sc1630 == "0") {
        return bg0;
      } else if (data.sc1630 == "1") {
        return bg1;
      } else if (data.sc1630 == "2") {
        return bg2;
      } else if (data.sc1630 == "3") {
        return bg3;
      }
      break;

    case "r1700":
      if (data.sc1700 == "0") {
        return bg0;
      } else if (data.sc1700 == "1") {
        return bg1;
      } else if (data.sc1700 == "2") {
        return bg2;
      } else if (data.sc1700 == "3") {
        return bg3;
      }
      break;

    case "r1730":
      if (data.sc1730 == "0") {
        return bg0;
      } else if (data.sc1730 == "1") {
        return bg1;
      } else if (data.sc1730 == "2") {
        return bg2;
      } else if (data.sc1730 == "3") {
        return bg3;
      }
      break;

    case "r1800":
      if (data.sc1800 == "0") {
        return bg0;
      } else if (data.sc1800 == "1") {
        return bg1;
      } else if (data.sc1800 == "2") {
        return bg2;
      } else if (data.sc1800 == "3") {
        return bg3;
      }
      break;

    case "r1830":
      if (data.sc1830 == "0") {
        return bg0;
      } else if (data.sc1830 == "1") {
        return bg1;
      } else if (data.sc1830 == "2") {
        return bg2;
      } else if (data.sc1830 == "3") {
        return bg3;
      }
      break;

    case "r1900":
      if (data.sc1900 == "0") {
        return bg0;
      } else if (data.sc1830 == "1") {
        return bg1;
      } else if (data.sc1830 == "2") {
        return bg2;
      } else if (data.sc1830 == "3") {
        return bg3;
      }
      break;
    case "r1930":
      if (data.sc1930 == "0") {
        return bg0;
      } else if (data.sc1930 == "1") {
        return bg1;
      } else if (data.sc1930 == "2") {
        return bg2;
      } else if (data.sc1930 == "3") {
        return bg3;
      }
      break;

    case "r2000":
      if (data.sc2000 == "0") {
        return bg0;
      } else if (data.sc2000 == "1") {
        return bg1;
      } else if (data.sc2000 == "2") {
        return bg2;
      } else if (data.sc2000 == "3") {
        return bg3;
      }
      break;

    case "r2030":
      if (data.sc2030 == "0") {
        return bg0;
      } else if (data.sc2030 == "1") {
        return bg1;
      } else if (data.sc2030 == "2") {
        return bg2;
      } else if (data.sc2030 == "3") {
        return bg3;
      }
      break;

    case "r2100":
      if (data.sc2100 == "0") {
        return bg0;
      } else if (data.sc2100 == "1") {
        return bg1;
      } else if (data.sc2100 == "2") {
        return bg2;
      } else if (data.sc2100 == "3") {
        return bg3;
      }
      break;

    case "r2130":
      if (data.sc2130 == "0") {
        return bg0;
      } else if (data.sc2130 == "1") {
        return bg1;
      } else if (data.sc2130 == "2") {
        return bg2;
      } else if (data.sc2130 == "3") {
        return bg3;
      }
      break;

    case "r2200":
      if (data.sc2200 == "0") {
        return bg0;
      } else if (data.sc2200 == "1") {
        return bg1;
      } else if (data.sc2200 == "2") {
        return bg2;
      } else if (data.sc2200 == "3") {
        return bg3;
      }
      break;

    case "r2230":
      if (data.sc2230 == "0") {
        return bg0;
      } else if (data.sc2230 == "1") {
        return bg1;
      } else if (data.sc2230 == "2") {
        return bg2;
      } else if (data.sc2230 == "3") {
        return bg3;
      }
      break;

    case "r2300":
      if (data.sc2300 == "0") {
        return bg0;
      } else if (data.sc2300 == "1") {
        return bg1;
      } else if (data.sc2300 == "2") {
        return bg2;
      } else if (data.sc2300 == "3") {
        return bg3;
      }
      break;

    case "r2330":
      if (data.sc2330 == "0") {
        return bg0;
      } else if (data.sc2330 == "1") {
        return bg1;
      } else if (data.sc2330 == "2") {
        return bg2;
      } else if (data.sc2330 == "3") {
        return bg3;
      }
      break;
    case "s0000":
      if (data.sc0000 == "0") {
        return bg0;
      } else if (data.sc0000 == "1") {
        return bg1;
      } else if (data.sc0000 == "2") {
        return bg2;
      } else if (data.sc0000 == "3") {
        return bg3;
      }
      break;

    case "s0030":
      if (data.sc0030 == "0") {
        return bg0;
      } else if (data.sc0030 == "1") {
        return bg1;
      } else if (data.sc0030 == "2") {
        return bg2;
      } else if (data.sc0030 == "3") {
        return bg3;
      }
      break;

    case "s0100":
      if (data.sc0100 == "0") {
        return bg0;
      } else if (data.sc0100 == "1") {
        return bg1;
      } else if (data.sc0100 == "2") {
        return bg2;
      } else if (data.sc0100 == "3") {
        return bg3;
      }
      break;

    case "s0130":
      if (data.sc0130 == "0") {
        return bg0;
      } else if (data.sc0130 == "1") {
        return bg1;
      } else if (data.sc0130 == "2") {
        return bg2;
      } else if (data.sc0130 == "3") {
        return bg3;
      }
      break;

    case "s0200":
      if (data.sc0200 == "0") {
        return bg0;
      } else if (data.sc0200 == "1") {
        return bg1;
      } else if (data.sc0200 == "2") {
        return bg2;
      } else if (data.sc0200 == "3") {
        return bg3;
      }
      break;

    case "s0230":
      if (data.sc0230 == "0") {
        return bg0;
      } else if (data.sc0230 == "1") {
        return bg1;
      } else if (data.sc0230 == "2") {
        return bg2;
      } else if (data.sc0230 == "3") {
        return bg3;
      }
      break;

    case "s0300":
      if (data.sc0300 == "0") {
        return bg0;
      } else if (data.sc0300 == "1") {
        return bg1;
      } else if (data.sc0300 == "2") {
        return bg2;
      } else if (data.sc0300 == "3") {
        return bg3;
      }
      break;

    case "s0330":
      if (data.sc0330 == "0") {
        return bg0;
      } else if (data.sc0330 == "1") {
        return bg1;
      } else if (data.sc0330 == "2") {
        return bg2;
      } else if (data.sc0330 == "3") {
        return bg3;
      }
      break;
    case "s0400":
      if (data.sc0400 == "0") {
        return bg0;
      } else if (data.sc0400 == "1") {
        return bg1;
      } else if (data.sc0400 == "2") {
        return bg2;
      } else if (data.sc0400 == "3") {
        return bg3;
      }
      break;

    case "s0430":
      if (data.sc0430 == "0") {
        return bg0;
      } else if (data.sc0430 == "1") {
        return bg1;
      } else if (data.sc0430 == "2") {
        return bg2;
      } else if (data.sc0430 == "3") {
        return bg3;
      }
      break;

    case "s0500":
      if (data.sc0500 == "0") {
        return bg0;
      } else if (data.sc0500 == "1") {
        return bg1;
      } else if (data.sc0500 == "2") {
        return bg2;
      } else if (data.sc0500 == "3") {
        return bg3;
      }
      break;

    case "s0530":
      if (data.sc0530 == "0") {
        return bg0;
      } else if (data.sc0530 == "1") {
        return bg1;
      } else if (data.sc0530 == "2") {
        return bg2;
      } else if (data.sc0530 == "3") {
        return bg3;
      }
      break;

    case "s0600":
      if (data.sc0600 == "0") {
        return bg0;
      } else if (data.sc0600 == "1") {
        return bg1;
      } else if (data.sc0600 == "2") {
        return bg2;
      } else if (data.sc0600 == "3") {
        return bg3;
      }
      break;

    case "s0630":
      if (data.sc0630 == "0") {
        return bg0;
      } else if (data.sc0630 == "1") {
        return bg1;
      } else if (data.sc0630 == "2") {
        return bg2;
      } else if (data.sc0630 == "3") {
        return bg3;
      }
      break;

    case "s0700":
      if (data.sc0700 == "0") {
        return bg0;
      } else if (data.sc0700 == "1") {
        return bg1;
      } else if (data.sc0700 == "2") {
        return bg2;
      } else if (data.sc0700 == "3") {
        return bg3;
      }
      break;

    case "s0730":
      if (data.sc0730 == "0") {
        return bg0;
      } else if (data.sc0730 == "1") {
        return bg1;
      } else if (data.sc0730 == "2") {
        return bg2;
      } else if (data.sc0730 == "3") {
        return bg3;
      }
      break;

    case "s0800":
      if (data.sc0800 == "0") {
        return bg0;
      } else if (data.sc0800 == "1") {
        return bg1;
      } else if (data.sc0800 == "2") {
        return bg2;
      } else if (data.sc0800 == "3") {
        return bg3;
      }
      break;

    case "s0830":
      if (data.sc0830 == "0") {
        return bg0;
      } else if (data.sc0830 == "1") {
        return bg1;
      } else if (data.sc0830 == "2") {
        return bg2;
      } else if (data.sc0830 == "3") {
        return bg3;
      }
      break;

    case "s0900":
      if (data.sc0900 == "0") {
        return bg0;
      } else if (data.sc0900 == "1") {
        return bg1;
      } else if (data.sc0900 == "2") {
        return bg2;
      } else if (data.sc0900 == "3") {
        return bg3;
      }
      break;

    case "s0930":
      if (data.sc0930 == "0") {
        return bg0;
      } else if (data.sc0930 == "1") {
        return bg1;
      } else if (data.sc0930 == "2") {
        return bg2;
      } else if (data.sc0930 == "3") {
        return bg3;
      }
      break;

    case "s1000":
      if (data.sc1000 == "0") {
        return bg0;
      } else if (data.sc1000 == "1") {
        return bg1;
      } else if (data.sc1000 == "2") {
        return bg2;
      } else if (data.sc1000 == "3") {
        return bg3;
      }
      break;

    case "s1030":
      if (data.sc1030 == "0") {
        return bg0;
      } else if (data.sc1030 == "1") {
        return bg1;
      } else if (data.sc1030 == "2") {
        return bg2;
      } else if (data.sc1030 == "3") {
        return bg3;
      }
      break;

    case "s1100":
      if (data.sc1100 == "0") {
        return bg0;
      } else if (data.sc1100 == "1") {
        return bg1;
      } else if (data.sc1100 == "2") {
        return bg2;
      } else if (data.sc1100 == "3") {
        return bg3;
      }
      break;

    case "s1130":
      if (data.sc1130 == "0") {
        return bg0;
      } else if (data.sc1130 == "1") {
        return bg1;
      } else if (data.sc1130 == "2") {
        return bg2;
      } else if (data.sc1130 == "3") {
        return bg3;
      }
      break;

    case "s1200":
      if (data.sc1200 == "0") {
        return bg0;
      } else if (data.sc1200 == "1") {
        return bg1;
      } else if (data.sc1200 == "2") {
        return bg2;
      } else if (data.sc1200 == "3") {
        return bg3;
      }
      break;

    case "s1230":
      if (data.sc1230 == "0") {
        return bg0;
      } else if (data.sc1230 == "1") {
        return bg1;
      } else if (data.sc1230 == "2") {
        return bg2;
      } else if (data.sc1230 == "3") {
        return bg3;
      }
      break;

    case "s1300":
      if (data.sc1300 == "0") {
        return bg0;
      } else if (data.sc1300 == "1") {
        return bg1;
      } else if (data.sc1300 == "2") {
        return bg2;
      } else if (data.sc1300 == "3") {
        return bg3;
      }
      break;

    case "s1330":
      if (data.sc1330 == "0") {
        return bg0;
      } else if (data.sc1330 == "1") {
        return bg1;
      } else if (data.sc1330 == "2") {
        return bg2;
      } else if (data.sc1330 == "3") {
        return bg3;
      }
      break;

    case "s1400":
      if (data.sc1400 == "0") {
        return bg0;
      } else if (data.sc1400 == "1") {
        return bg1;
      } else if (data.sc1400 == "2") {
        return bg2;
      } else if (data.sc1400 == "3") {
        return bg3;
      }
      break;

    case "s1430":
      if (data.sc1430 == "0") {
        return bg0;
      } else if (data.sc1430 == "1") {
        return bg1;
      } else if (data.sc1430 == "2") {
        return bg2;
      } else if (data.sc1430 == "3") {
        return bg3;
      }
      break;

    case "s1500":
      if (data.sc1500 == "0") {
        return bg0;
      } else if (data.sc1500 == "1") {
        return bg1;
      } else if (data.sc1500 == "2") {
        return bg2;
      } else if (data.sc1500 == "3") {
        return bg3;
      }
      break;

    case "s1530":
      if (data.sc1530 == "0") {
        return bg0;
      } else if (data.sc1530 == "1") {
        return bg1;
      } else if (data.sc1530 == "2") {
        return bg2;
      } else if (data.sc1530 == "3") {
        return bg3;
      }
      break;

    case "s1600":
      if (data.sc1600 == "0") {
        return bg0;
      } else if (data.sc1600 == "1") {
        return bg1;
      } else if (data.sc1600 == "2") {
        return bg2;
      } else if (data.sc1600 == "3") {
        return bg3;
      }
      break;

    case "s1630":
      if (data.sc1630 == "0") {
        return bg0;
      } else if (data.sc1630 == "1") {
        return bg1;
      } else if (data.sc1630 == "2") {
        return bg2;
      } else if (data.sc1630 == "3") {
        return bg3;
      }
      break;

    case "s1700":
      if (data.sc1700 == "0") {
        return bg0;
      } else if (data.sc1700 == "1") {
        return bg1;
      } else if (data.sc1700 == "2") {
        return bg2;
      } else if (data.sc1700 == "3") {
        return bg3;
      }
      break;

    case "s1730":
      if (data.sc1730 == "0") {
        return bg0;
      } else if (data.sc1730 == "1") {
        return bg1;
      } else if (data.sc1730 == "2") {
        return bg2;
      } else if (data.sc1730 == "3") {
        return bg3;
      }
      break;

    case "s1800":
      if (data.sc1800 == "0") {
        return bg0;
      } else if (data.sc1800 == "1") {
        return bg1;
      } else if (data.sc1800 == "2") {
        return bg2;
      } else if (data.sc1800 == "3") {
        return bg3;
      }
      break;

    case "s1830":
      if (data.sc1830 == "0") {
        return bg0;
      } else if (data.sc1830 == "1") {
        return bg1;
      } else if (data.sc1830 == "2") {
        return bg2;
      } else if (data.sc1830 == "3") {
        return bg3;
      }
      break;

    case "s1900":
      if (data.sc1900 == "0") {
        return bg0;
      } else if (data.sc1830 == "1") {
        return bg1;
      } else if (data.sc1830 == "2") {
        return bg2;
      } else if (data.sc1830 == "3") {
        return bg3;
      }
      break;
    case "s1930":
      if (data.sc1930 == "0") {
        return bg0;
      } else if (data.sc1930 == "1") {
        return bg1;
      } else if (data.sc1930 == "2") {
        return bg2;
      } else if (data.sc1930 == "3") {
        return bg3;
      }
      break;

    case "s2000":
      if (data.sc2000 == "0") {
        return bg0;
      } else if (data.sc2000 == "1") {
        return bg1;
      } else if (data.sc2000 == "2") {
        return bg2;
      } else if (data.sc2000 == "3") {
        return bg3;
      }
      break;

    case "s2030":
      if (data.sc2030 == "0") {
        return bg0;
      } else if (data.sc2030 == "1") {
        return bg1;
      } else if (data.sc2030 == "2") {
        return bg2;
      } else if (data.sc2030 == "3") {
        return bg3;
      }
      break;

    case "s2100":
      if (data.sc2100 == "0") {
        return bg0;
      } else if (data.sc2100 == "1") {
        return bg1;
      } else if (data.sc2100 == "2") {
        return bg2;
      } else if (data.sc2100 == "3") {
        return bg3;
      }
      break;

    case "s2130":
      if (data.sc2130 == "0") {
        return bg0;
      } else if (data.sc2130 == "1") {
        return bg1;
      } else if (data.sc2130 == "2") {
        return bg2;
      } else if (data.sc2130 == "3") {
        return bg3;
      }
      break;

    case "s2200":
      if (data.sc2200 == "0") {
        return bg0;
      } else if (data.sc2200 == "1") {
        return bg1;
      } else if (data.sc2200 == "2") {
        return bg2;
      } else if (data.sc2200 == "3") {
        return bg3;
      }
      break;

    case "s2230":
      if (data.sc2230 == "0") {
        return bg0;
      } else if (data.sc2230 == "1") {
        return bg1;
      } else if (data.sc2230 == "2") {
        return bg2;
      } else if (data.sc2230 == "3") {
        return bg3;
      }
      break;

    case "s2300":
      if (data.sc2300 == "0") {
        return bg0;
      } else if (data.sc2300 == "1") {
        return bg1;
      } else if (data.sc2300 == "2") {
        return bg2;
      } else if (data.sc2300 == "3") {
        return bg3;
      }
      break;

    case "s2330":
      if (data.sc2330 == "0") {
        return bg0;
      } else if (data.sc2330 == "1") {
        return bg1;
      } else if (data.sc2330 == "2") {
        return bg2;
      } else if (data.sc2330 == "3") {
        return bg3;
      }
      break;

    case "t0000":
      if (data.sc0000 == "0") {
        return bg0;
      } else if (data.sc0000 == "1") {
        return bg1;
      } else if (data.sc0000 == "2") {
        return bg2;
      } else if (data.sc0000 == "3") {
        return bg3;
      }
      break;

    case "t0030":
      if (data.sc0030 == "0") {
        return bg0;
      } else if (data.sc0030 == "1") {
        return bg1;
      } else if (data.sc0030 == "2") {
        return bg2;
      } else if (data.sc0030 == "3") {
        return bg3;
      }
      break;

    case "t0100":
      if (data.sc0100 == "0") {
        return bg0;
      } else if (data.sc0100 == "1") {
        return bg1;
      } else if (data.sc0100 == "2") {
        return bg2;
      } else if (data.sc0100 == "3") {
        return bg3;
      }
      break;

    case "t0130":
      if (data.sc0130 == "0") {
        return bg0;
      } else if (data.sc0130 == "1") {
        return bg1;
      } else if (data.sc0130 == "2") {
        return bg2;
      } else if (data.sc0130 == "3") {
        return bg3;
      }
      break;

    case "t0200":
      if (data.sc0200 == "0") {
        return bg0;
      } else if (data.sc0200 == "1") {
        return bg1;
      } else if (data.sc0200 == "2") {
        return bg2;
      } else if (data.sc0200 == "3") {
        return bg3;
      }
      break;

    case "t0230":
      if (data.sc0230 == "0") {
        return bg0;
      } else if (data.sc0230 == "1") {
        return bg1;
      } else if (data.sc0230 == "2") {
        return bg2;
      } else if (data.sc0230 == "3") {
        return bg3;
      }
      break;

    case "t0300":
      if (data.sc0300 == "0") {
        return bg0;
      } else if (data.sc0300 == "1") {
        return bg1;
      } else if (data.sc0300 == "2") {
        return bg2;
      } else if (data.sc0300 == "3") {
        return bg3;
      }
      break;

    case "t0330":
      if (data.sc0330 == "0") {
        return bg0;
      } else if (data.sc0330 == "1") {
        return bg1;
      } else if (data.sc0330 == "2") {
        return bg2;
      } else if (data.sc0330 == "3") {
        return bg3;
      }
      break;
    case "t0400":
      if (data.sc0400 == "0") {
        return bg0;
      } else if (data.sc0400 == "1") {
        return bg1;
      } else if (data.sc0400 == "2") {
        return bg2;
      } else if (data.sc0400 == "3") {
        return bg3;
      }
      break;

    case "t0430":
      if (data.sc0430 == "0") {
        return bg0;
      } else if (data.sc0430 == "1") {
        return bg1;
      } else if (data.sc0430 == "2") {
        return bg2;
      } else if (data.sc0430 == "3") {
        return bg3;
      }
      break;

    case "t0500":
      if (data.sc0500 == "0") {
        return bg0;
      } else if (data.sc0500 == "1") {
        return bg1;
      } else if (data.sc0500 == "2") {
        return bg2;
      } else if (data.sc0500 == "3") {
        return bg3;
      }
      break;

    case "t0530":
      if (data.sc0530 == "0") {
        return bg0;
      } else if (data.sc0530 == "1") {
        return bg1;
      } else if (data.sc0530 == "2") {
        return bg2;
      } else if (data.sc0530 == "3") {
        return bg3;
      }
      break;

    case "t0600":
      if (data.sc0600 == "0") {
        return bg0;
      } else if (data.sc0600 == "1") {
        return bg1;
      } else if (data.sc0600 == "2") {
        return bg2;
      } else if (data.sc0600 == "3") {
        return bg3;
      }
      break;

    case "t0630":
      if (data.sc0630 == "0") {
        return bg0;
      } else if (data.sc0630 == "1") {
        return bg1;
      } else if (data.sc0630 == "2") {
        return bg2;
      } else if (data.sc0630 == "3") {
        return bg3;
      }
      break;

    case "t0700":
      if (data.sc0700 == "0") {
        return bg0;
      } else if (data.sc0700 == "1") {
        return bg1;
      } else if (data.sc0700 == "2") {
        return bg2;
      } else if (data.sc0700 == "3") {
        return bg3;
      }
      break;

    case "t0730":
      if (data.sc0730 == "0") {
        return bg0;
      } else if (data.sc0730 == "1") {
        return bg1;
      } else if (data.sc0730 == "2") {
        return bg2;
      } else if (data.sc0730 == "3") {
        return bg3;
      }
      break;

    case "t0800":
      if (data.sc0800 == "0") {
        return bg0;
      } else if (data.sc0800 == "1") {
        return bg1;
      } else if (data.sc0800 == "2") {
        return bg2;
      } else if (data.sc0800 == "3") {
        return bg3;
      }
      break;

    case "t0830":
      if (data.sc0830 == "0") {
        return bg0;
      } else if (data.sc0830 == "1") {
        return bg1;
      } else if (data.sc0830 == "2") {
        return bg2;
      } else if (data.sc0830 == "3") {
        return bg3;
      }
      break;

    case "t0900":
      if (data.sc0900 == "0") {
        return bg0;
      } else if (data.sc0900 == "1") {
        return bg1;
      } else if (data.sc0900 == "2") {
        return bg2;
      } else if (data.sc0900 == "3") {
        return bg3;
      }
      break;

    case "t0930":
      if (data.sc0930 == "0") {
        return bg0;
      } else if (data.sc0930 == "1") {
        return bg1;
      } else if (data.sc0930 == "2") {
        return bg2;
      } else if (data.sc0930 == "3") {
        return bg3;
      }
      break;

    case "t1000":
      if (data.sc1000 == "0") {
        return bg0;
      } else if (data.sc1000 == "1") {
        return bg1;
      } else if (data.sc1000 == "2") {
        return bg2;
      } else if (data.sc1000 == "3") {
        return bg3;
      }
      break;

    case "t1030":
      if (data.sc1030 == "0") {
        return bg0;
      } else if (data.sc1030 == "1") {
        return bg1;
      } else if (data.sc1030 == "2") {
        return bg2;
      } else if (data.sc1030 == "3") {
        return bg3;
      }
      break;

    case "t1100":
      if (data.sc1100 == "0") {
        return bg0;
      } else if (data.sc1100 == "1") {
        return bg1;
      } else if (data.sc1100 == "2") {
        return bg2;
      } else if (data.sc1100 == "3") {
        return bg3;
      }
      break;

    case "t1130":
      if (data.sc1130 == "0") {
        return bg0;
      } else if (data.sc1130 == "1") {
        return bg1;
      } else if (data.sc1130 == "2") {
        return bg2;
      } else if (data.sc1130 == "3") {
        return bg3;
      }
      break;

    case "t1200":
      if (data.sc1200 == "0") {
        return bg0;
      } else if (data.sc1200 == "1") {
        return bg1;
      } else if (data.sc1200 == "2") {
        return bg2;
      } else if (data.sc1200 == "3") {
        return bg3;
      }
      break;

    case "t1230":
      if (data.sc1230 == "0") {
        return bg0;
      } else if (data.sc1230 == "1") {
        return bg1;
      } else if (data.sc1230 == "2") {
        return bg2;
      } else if (data.sc1230 == "3") {
        return bg3;
      }
      break;

    case "t1300":
      if (data.sc1300 == "0") {
        return bg0;
      } else if (data.sc1300 == "1") {
        return bg1;
      } else if (data.sc1300 == "2") {
        return bg2;
      } else if (data.sc1300 == "3") {
        return bg3;
      }
      break;

    case "t1330":
      if (data.sc1330 == "0") {
        return bg0;
      } else if (data.sc1330 == "1") {
        return bg1;
      } else if (data.sc1330 == "2") {
        return bg2;
      } else if (data.sc1330 == "3") {
        return bg3;
      }
      break;

    case "t1400":
      if (data.sc1400 == "0") {
        return bg0;
      } else if (data.sc1400 == "1") {
        return bg1;
      } else if (data.sc1400 == "2") {
        return bg2;
      } else if (data.sc1400 == "3") {
        return bg3;
      }
      break;

    case "t1430":
      if (data.sc1430 == "0") {
        return bg0;
      } else if (data.sc1430 == "1") {
        return bg1;
      } else if (data.sc1430 == "2") {
        return bg2;
      } else if (data.sc1430 == "3") {
        return bg3;
      }
      break;

    case "t1500":
      if (data.sc1500 == "0") {
        return bg0;
      } else if (data.sc1500 == "1") {
        return bg1;
      } else if (data.sc1500 == "2") {
        return bg2;
      } else if (data.sc1500 == "3") {
        return bg3;
      }
      break;

    case "t1530":
      if (data.sc1530 == "0") {
        return bg0;
      } else if (data.sc1530 == "1") {
        return bg1;
      } else if (data.sc1530 == "2") {
        return bg2;
      } else if (data.sc1530 == "3") {
        return bg3;
      }
      break;

    case "t1600":
      if (data.sc1600 == "0") {
        return bg0;
      } else if (data.sc1600 == "1") {
        return bg1;
      } else if (data.sc1600 == "2") {
        return bg2;
      } else if (data.sc1600 == "3") {
        return bg3;
      }
      break;

    case "t1630":
      if (data.sc1630 == "0") {
        return bg0;
      } else if (data.sc1630 == "1") {
        return bg1;
      } else if (data.sc1630 == "2") {
        return bg2;
      } else if (data.sc1630 == "3") {
        return bg3;
      }
      break;

    case "t1700":
      if (data.sc1700 == "0") {
        return bg0;
      } else if (data.sc1700 == "1") {
        return bg1;
      } else if (data.sc1700 == "2") {
        return bg2;
      } else if (data.sc1700 == "3") {
        return bg3;
      }
      break;

    case "t1730":
      if (data.sc1730 == "0") {
        return bg0;
      } else if (data.sc1730 == "1") {
        return bg1;
      } else if (data.sc1730 == "2") {
        return bg2;
      } else if (data.sc1730 == "3") {
        return bg3;
      }
      break;

    case "t1800":
      if (data.sc1800 == "0") {
        return bg0;
      } else if (data.sc1800 == "1") {
        return bg1;
      } else if (data.sc1800 == "2") {
        return bg2;
      } else if (data.sc1800 == "3") {
        return bg3;
      }
      break;

    case "t1830":
      if (data.sc1830 == "0") {
        return bg0;
      } else if (data.sc1830 == "1") {
        return bg1;
      } else if (data.sc1830 == "2") {
        return bg2;
      } else if (data.sc1830 == "3") {
        return bg3;
      }
      break;

    case "t1900":
      if (data.sc1900 == "0") {
        return bg0;
      } else if (data.sc1830 == "1") {
        return bg1;
      } else if (data.sc1830 == "2") {
        return bg2;
      } else if (data.sc1830 == "3") {
        return bg3;
      }
      break;
    case "t1930":
      if (data.sc1930 == "0") {
        return bg0;
      } else if (data.sc1930 == "1") {
        return bg1;
      } else if (data.sc1930 == "2") {
        return bg2;
      } else if (data.sc1930 == "3") {
        return bg3;
      }
      break;

    case "t2000":
      if (data.sc2000 == "0") {
        return bg0;
      } else if (data.sc2000 == "1") {
        return bg1;
      } else if (data.sc2000 == "2") {
        return bg2;
      } else if (data.sc2000 == "3") {
        return bg3;
      }
      break;

    case "t2030":
      if (data.sc2030 == "0") {
        return bg0;
      } else if (data.sc2030 == "1") {
        return bg1;
      } else if (data.sc2030 == "2") {
        return bg2;
      } else if (data.sc2030 == "3") {
        return bg3;
      }
      break;

    case "t2100":
      if (data.sc2100 == "0") {
        return bg0;
      } else if (data.sc2100 == "1") {
        return bg1;
      } else if (data.sc2100 == "2") {
        return bg2;
      } else if (data.sc2100 == "3") {
        return bg3;
      }
      break;

    case "t2130":
      if (data.sc2130 == "0") {
        return bg0;
      } else if (data.sc2130 == "1") {
        return bg1;
      } else if (data.sc2130 == "2") {
        return bg2;
      } else if (data.sc2130 == "3") {
        return bg3;
      }
      break;

    case "t2200":
      if (data.sc2200 == "0") {
        return bg0;
      } else if (data.sc2200 == "1") {
        return bg1;
      } else if (data.sc2200 == "2") {
        return bg2;
      } else if (data.sc2200 == "3") {
        return bg3;
      }
      break;

    case "t2230":
      if (data.sc2230 == "0") {
        return bg0;
      } else if (data.sc2230 == "1") {
        return bg1;
      } else if (data.sc2230 == "2") {
        return bg2;
      } else if (data.sc2230 == "3") {
        return bg3;
      }
      break;

    case "t2300":
      if (data.sc2300 == "0") {
        return bg0;
      } else if (data.sc2300 == "1") {
        return bg1;
      } else if (data.sc2300 == "2") {
        return bg2;
      } else if (data.sc2300 == "3") {
        return bg3;
      }
      break;

    case "t2330":
      if (data.sc2330 == "0") {
        return bg0;
      } else if (data.sc2330 == "1") {
        return bg1;
      } else if (data.sc2330 == "2") {
        return bg2;
      } else if (data.sc2330 == "3") {
        return bg3;
      }
      break;
    default:
      return bg4;
  }
}
