import CardInfoNew from "@app/components/Card/CardInfoNew";
import CardWidget from "@app/components/Card/CardWidget";
import { getAllByPath } from "@app/services/main.service";
import { API_PATH } from "@app/services/_path.service";
import axios from "axios";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function BoxPrioritasAset({
  path,
  title,
  suffix = "%",
  filterParams = {
    page: -1,
    limit: -1,
    sort_by: "nama,-no_aset_int,deskripsi",
  },
  fieldLable = "nama",
  fieldValue = "p",
  fieldDeskripsi = "deskripsi",
}: //   md = 2,
IBoxPrioritasAset) {
  const [data, setData] = useState<any>();
  const [, setLoading] = useState<boolean>(true);
  const source = axios.CancelToken.source();
  let variant: any = ["danger", "warning", "success"];
  let mdx: any = 0;
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
      mdx = results.length > 0 ? 12 / results.length : 0;
      let data = results?.map((item: any) => {
        return {
          label: get(item, fieldLable) || "",
          value: get(item, fieldValue) || 0.0,
          deskripsi: get(item, fieldDeskripsi) || "",
        };
      });
      setData(data);
      setLoading(false);
    } catch (err: any) {
      // console.log("error",);

      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
    // const timer: any
    // if (autoReload) {
    const timer = setInterval(() => {
      getAllData();
    }, 500000);
    // }

    return () => {
      source.cancel();
      clearInterval(timer);
    };
  }, [path]);

  return (
    <>
      <CardWidget title={title}>
        <Row className="gx-1">
          {data?.map((item: any, index: number) => (
            <Col md={mdx} key={index} className="mb-2">
              <CardInfoNew
                variant={variant[index]}
                value={item?.value}
                suffix={suffix}
                label={`Prioritas ${item?.label}`}
                suffixBottom={item?.deskripsi}
              />
            </Col>
          ))}
        </Row>
      </CardWidget>
    </>
  );
}

interface IBoxPrioritasAset {
  path: string;
  title: string;
  suffix?: string;
  param?: any;
  variant?: string;
  fieldLable?: string;
  fieldValue?: string;
  fieldDeskripsi?: string;
  filterParams?: any;
  autoReload?: boolean;
  md?: number;
  data_categories?: any[any];
}
