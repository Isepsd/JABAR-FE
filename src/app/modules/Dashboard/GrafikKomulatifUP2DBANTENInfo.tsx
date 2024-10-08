import React, { useEffect, useState } from 'react';

import { toTitleCase } from '@app/helper/string.helper';
import { getAllByPath } from '@app/services/main.service';
import { API_PATH } from '@app/services/_path.service';
import axios from 'axios';
import { get } from 'lodash';
import BarChartBangka from '../Highcharts/BarChartBangka';

function GrafikKomulatif({
  path,
  suffix,
  titleY = "",
  filterParams
}: IGrafikKomulatif) {
  const [series, setSeries] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const source = axios.CancelToken.source();

  const getCategoriesAndSeries = (kinerjapoint: any) => {
    if (kinerjapoint && Array.isArray(kinerjapoint)) {
      const categoriesData = get(kinerjapoint[0], 'categories', []);
      const seriesData = get(kinerjapoint[1], 'series', []);

      setCategories(categoriesData);
      
      const formattedSeries = seriesData.map((item: any) => {
        const name = toTitleCase(item?.name || "");
        return {
          name: name.concat(suffix ? suffix : ""),
          data: item?.data || [],
          yAxis:item?.yAxis
        };
      });
      
      setSeries(formattedSeries);
    } else {
     
      setCategories([]);
      setSeries([]);
    }
  };

  const getAllData = async () => {
    setLoading(true);

    try {
      const req: any = await getAllByPath(
        get(API_PATH(), path),
        filterParams,
        source.token
      );
      const { results } = req;
      
      if (results?.kinerjapoint) {
        getCategoriesAndSeries(results.kinerjapoint);
      } else {
     
        setCategories([]);
        setSeries([]);
      }

      setLoading(false);
    } catch (err: any) {
      // console.error('Error fetching data:', err);
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
  }, []);

  return (
    <>
 
 <div className="chart-container" style={{ height: 'auto', minHeight: '53rem', overflow: 'auto' }}>
          <BarChartBangka
            categories={categories}
            series={series}
            loading={loading}
            titleY={titleY}
          />
        </div>
     
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
