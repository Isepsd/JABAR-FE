import CardWidget from '@app/components/Card/CardWidget';
import { toTitleCase } from '@app/helper/string.helper';
// import { chartMonthCategories, timeFormSelect } from '@app/helper/time.helper';
import { getAllByPath } from '@app/services/main.service';
import { API_PATH } from '@app/services/_path.service';
import axios from 'axios';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import SplineChartDashboard from '../Highcharts/SplineChartDashboard';

function GrafikKomulatif({
  path,
  title,
  height = "20rem",
  suffix,
  titleY = "",
  filterParams
}: IGrafikKomulatif) {
  const [series, setSeries] = useState<any[]>([]); // Inisialisasi dengan array kosong
  const [categories, setCategories] = useState<any[]>([]); // Inisialisasi dengan array kosong
  const [loading, setLoading] = useState<boolean>(true);
  const source = axios.CancelToken.source();

  const getCategoriesAndSeries = (datachart: any) => {
    if (datachart && Array.isArray(datachart)) {
      // Assuming datachart[0] contains categories and datachart[1] contains series
      const categoriesData = get(datachart[0], 'categories', []);
      const seriesData = get(datachart[1], 'series', []);

      setCategories(categoriesData);
      
      // Format series data if needed
      const formattedSeries = seriesData.map((item: any) => {
        const name = toTitleCase(item?.name || "");
        return {
          name: name.concat(suffix ? suffix : ""),
          data: item?.data || [],
        };
      });
      
      setSeries(formattedSeries);
    } else {
      // Handle case where datachart is not in expected format
     
      setCategories([]);
      setSeries([]);
    }
  };

  /** GET DATA PAGINATION */
  const getAllData = async () => {
    setLoading(true);

    try {
      const req: any = await getAllByPath(
        get(API_PATH(), path),
        filterParams,
        source.token
      );
      const { results } = req;
      
      // Ensure results and datachart exist
      if (results?.datachart) {
        getCategoriesAndSeries(results.datachart);
      } else {
      
        setCategories([]);
        setSeries([]);
      }

      setLoading(false);
    } catch (err: any) {
      
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
    return () => {
      // source.cancel();
      setSeries([]);
      setCategories([]);
    };
  }, []); // Adding filterParams as dependency

  return (
    <>
      <CardWidget title={title}>
        <div style={{ height: height }}>
          <SplineChartDashboard
            categories={categories}
            series={series}
            loading={loading}
            titleY={titleY}
            legend={{
              // Uncomment and adjust legend configuration if needed
              // layout: 'horizontal',
              // align: 'bottom',
              // verticalAlign: 'bottom',
            }}
          />
        </div>
      </CardWidget>
    </>
  );
}

export default GrafikKomulatif;

interface IGrafikKomulatif {
  path: string;
  title: string;
  height?: string;
  suffix?: string;
  titleY?: string;
  filterParams?: any;
}
