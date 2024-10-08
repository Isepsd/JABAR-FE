import CardInfoStatusHarAset from "@app/components/Card/CardInfoStatusHarAset";
import CardWidget from "@app/components/Card/CardWidget";
import { getAllByPath } from "@app/services/main.service";
import { API_PATH } from "@app/services/_path.service";
import axios from "axios";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function BoxStatusHarAset({
  path,
  title,
  variant = "info",
  filterParams = {
    page: -1,
    limit: -1,
    sort_by: "nama,-no_aset_int,deskripsi",
  },
}: //   md = 2,
IBoxStatusHarAset) {
  const [, setLoading] = useState<boolean>(true);
  const source = axios.CancelToken.source();
  let mdx: any = 0;
  let il1_s: any = 0;
  let il1_b: any = 0;
  let il2_s: any = 0;
  let il2_b: any = 0;
  let il3_s: any = 0;
  let il3_b: any = 0;
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

      results?.map((item: any) => {
        console.log(item?.tgl_entri);
        if (item?.id_trans_pm_level_1 == null) {
          il1_b = il1_b + 1;
        } else {
          il1_s = il1_s + 1;
        }
      });
      console.log(il1_b);
      console.log(il1_s);
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
          <Col md={mdx} className="mb-2">
            <CardInfoStatusHarAset
              variant={variant}
              label={"IL-1"}
              nilais={il1_s}
              nilaib={il1_b}
            />
          </Col>
          <Col md={mdx} className="mb-2">
            <CardInfoStatusHarAset
              variant={variant}
              label={"IL-2"}
              nilais={il2_s}
              nilaib={il2_b}
            />
          </Col>
          <Col md={mdx} className="mb-2">
            <CardInfoStatusHarAset
              variant={variant}
              label={"IL-3"}
              nilais={il3_s}
              nilaib={il3_b}
            />
          </Col>
        </Row>
      </CardWidget>
    </>
  );
}

interface IBoxStatusHarAset {
  path: string;
  title: string;
  suffix?: string;
  variant?: string;
  fieldLable?: string;
  fieldValue?: string;
  fieldDeskripsi?: string;
  filterParams?: any;
  autoReload?: boolean;
  md?: number;
  data_categories?: any[any];
}
