import CardWidget from '@app/components/Card/CardWidget';
import { toTitleCase } from '@app/helper/string.helper';
import { chartMonthCategories, timeFormSelect } from '@app/helper/time.helper';
import { getAllByPath } from '@app/services/main.service';
import { API_PATH } from '@app/services/_path.service';
import axios from 'axios';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import SplineChart from '../Highcharts/SplineChart';

function GrafikKomulatif({ path, title, height = "20rem", suffix, titleY = "" , filterParams}: IGrafikKomulatif) {
  const [series, setSeries] = useState<any>();
  const [categories, setCategories] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const source = axios.CancelToken.source();

  const getCategories = (results: any) => {
    if (results?.setting) {

      let interval = results?.setting == 30 ? 48 : 24;
      let time = results?.setting;
      let times = timeFormSelect(interval, time)
      let categories: any = []

      times?.map((item: any) => {
        categories.push(item?.label)
      })
      setCategories(categories)
    } else {
      let category = chartMonthCategories('MM', 'MMM');
      setCategories(category?.categoriesLabel);
    }
  }

  /** GET DATA PAGINATION */
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);

    try {
      const req: any = await getAllByPath(
        get(API_PATH(), path),
        filterParams,
        source.token
      );
      const { results } = req;
      let series = results?.series?.map((item: any) => {
        let name = toTitleCase(item?.name || "")
        return {
          name: name.concat(suffix ? suffix : ""),
          data: item?.data || [],
        };
      })
      getCategories(results);
      setSeries(series);

      setLoading(false);
    } catch (err: any) {
      // console.log("error",);

      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
    // console.log('rerender')
    return () => {
      source.cancel();
      setSeries(null);
      setCategories(null);
    };
  }, []);

  return (
    <>
      <CardWidget title={title}>
        <div style={{ height: height }}>
          <SplineChart
            categories={categories}
            series={series}
            loading={loading}
            titleY={titleY}
            legend={
              {
                // layout: 'horizontal',
                // align: 'bottom',
                // verticalAlign: 'bottom',
              }
            }
          />
        </div>
      </CardWidget>
    </>
  );
}

export default GrafikKomulatif

interface IGrafikKomulatif {
  path: string;
  title: string;
  height?: string;
  suffix?: string;
  titleY?: string;
  data_categories?: any[any]
  filterParams?: any;  
}
