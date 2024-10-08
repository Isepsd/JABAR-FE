import CardWidget from '@app/components/Card/CardWidget';
import React, { useEffect, useState } from 'react';
import SplineChart from '../Highcharts/SplineChart';

function GrafikKomulatif({ path, subtitle,title, titleY = '', useDummyData = false }: IGrafikKomulatif) {
  const [seriespie, setSeriespie] = useState<any>();
  const [categories, setCategories] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDummyData = () => {
    const dummyCategories = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
    const dummySeriespie = [
      {
        name: 'Realisasi',
        data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100)),
      },
      {
        name: 'Prediksi',
        data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100)),
      },
    ];

    setCategories(dummyCategories);
    setSeriespie(dummySeriespie);
    setLoading(false);
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      fetchDummyData(); // Call dummy data for now
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (useDummyData) {
      fetchDummyData();
    } else {
      fetchData();
    }

    return () => {
      setSeriespie(null);
      setCategories(null);
    };
  }, [path, useDummyData]);

  return (
    <CardWidget title={'BEBAN HARIAN DISTRIBUSI BANTEN'}>
      <SplineChart
        title={title}
        subtitle={subtitle}
        categories={categories}
        series={seriespie}
        loading={loading}
        titleY={titleY}
        legend={seriespie} // Custom prop for legend position
      />
    </CardWidget>
  );
}

export default GrafikKomulatif;

interface IGrafikKomulatif {
  path: string;
  title: string;
  height?: string;
  suffix?: string;
  subtitle:string;
  titleY?: string;
  useDummyData?: boolean;
}
