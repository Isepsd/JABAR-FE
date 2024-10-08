import CardInfo from "@app/components/Card/CardInfo";
import TopBarLoader from "@app/components/Loader/TopBarLoader";
import { getAllByPath } from "@app/services/main.service";
import { API_PATH } from "@app/services/_path.service";
import axios from "axios";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import CardWidget from '@app/components/Card/CardWidget';
function StatisticKinerjaScadaBangka({
  path,
  variant,
  suffix,
  height = '6.2rem',
  label1,
  fieldName1,
  subname1,
  label2,
  fieldName2,
  subname2,
  label0,
  fieldName0,
  subname0,
  filterParams,
}: StatisticKinerjaScadaBangkaProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const source = axios.CancelToken.source();

  /** GET DATA PAGINATION */
  const getAllData = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const req: any = await getAllByPath(get(API_PATH(), path), filterParams, source.token);
      const { results } = req;
      if (results) {
        const rekap = get(results, 'rekap', []);
        const newData = [];

        // Function to extract data based on item index
        const extractDataForItem = (index: number, label: string | undefined, fieldName: string, subname: string | undefined) => {
          if (Array.isArray(rekap) && rekap.length > index) {
            const item = rekap[index];
            const value = get(item, fieldName, 0); // Mengambil nilai dari fieldName
            const labelValue = get(item, label || ''); // Mengambil label
            const subnameValue = get(item, subname || ''); // Mengambil subname
            return { value, label: labelValue, subname: subnameValue };
          } else {
           
            return { value: 0, label: label || '', subname: subname || '' };
          }
        };

        // Extract and store data for all three items conditionally
        if (label0 && fieldName0) {
          newData.push(extractDataForItem(0, label0, fieldName0, subname0));
        }

        if (label1 && fieldName1) {
          newData.push(extractDataForItem(1, label1, fieldName1, subname1));
        }

        if (label2 && fieldName2) {
          newData.push(extractDataForItem(2, label2, fieldName2, subname2));
        }

        setData(newData);
      }

      setLoading(false);
    } catch (err: any) {
     
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();

    return () => {
      source.cancel();
      setData([]);
    };
  }, [filterParams]);

  return (
    <>

      <TopBarLoader isLoading={loading} />
      {data.map((item, index) => (
        <div key={index}>
        <CardWidget title={item?.subname}>
          <CardInfo
            variant={variant}
            value={item.value}
            suffix={suffix || ''}
            label={item.label} // Display dynamic label
            height={height}
            // subname={item.subname}
          />
          </CardWidget>
     
        </div>
      ))}
    </>
  );
}

export default React.memo(StatisticKinerjaScadaBangka);

interface StatisticKinerjaScadaBangkaProps {
  path: string;
  variant: string;
  suffix?: string;
  height?: string;
  label1?: string; // Make label optional
  fieldName1: string;
  subname1: string;
  label0?: string; // Make label optional
  fieldName0: string;
  subname0: string;
  label2?: string; // Make label optional
  fieldName2: string;
  subname2: string;
  filterParams: string;
}
