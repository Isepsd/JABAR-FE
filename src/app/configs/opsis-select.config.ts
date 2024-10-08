export const infoLabels = () => {
  return [
    // { name: "Beban belum diupdate", "color": "outline-dark" },
    { name: "Data dari Operator", color: "outline-dark" },
    { name: "Data dari SCADA/AMR", color: "trust" },
    { name: "Data dari SCADA/AMR melebihi I.Max", color: "anger" },
    // { name: "Data dari SCADA/AMR sudah diupdate Operator", "color": "joy" },
    { name: "Data Minus dari SCADA/AMR", color: "anticipation" },
    // { name: "Data Minus", "color": "surprise" },
  ];
};

export const infoLabelsNew = () => {
  return [
    // { name: "BELUM DIUPDATE", color: "outline-white" },
    { name: "DATA DARI SCADA/AMR", color: "trust" },
    { name: "DATA DARI ENTRI OPERATOR", color: "joy" },
    { name: "DATA DARI SCADA/AMR DIUPDATE OPERATOR", color: "surprise" },
    // { name: "DATA DARI SCADA/AMR MELEBIHI I.MAX", color: "anger" },
    // { name: "Data dari SCADA/AMR sudah diupdate Operator", "color": "joy" },
    // { name: "Data Minus dari SCADA/AMR", color: "anticipation" },
    // { name: "Data Minus", "color": "surprise" },
  ];
};
