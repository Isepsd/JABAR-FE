import React from "react";
import { Button } from "react-bootstrap";
import SubHeader from "../AppsLayout/Header/SubHeader";
import styled from "styled-components";
import { nanoid } from "@reduxjs/toolkit";
type Props = {
  children?: any;
  childrenPosition?: any;
  spaceTop?: any;
  infoLabels?: any[any];
  filterLayout?: "card";
  filter?: boolean | false;
};

function TableDataListActionNew({
  children,
  childrenPosition = "filter",
  spaceTop = 0,
  filterLayout = "card",
  infoLabels,
  filter = true,
}: Props) {
  const JustifyContent = styled.div`
    justify-content: space-between !important;
    display: flex !important;
    margin-top: ${spaceTop}rem;
  `;

  return (
    <>
      {filter && (
        <SubHeader filterLayout={filterLayout}>
          {filter && children && children}
        </SubHeader>
      )}
      {
        // (columns?.length > 0 || generate) && (
        <JustifyContent>
          <div>
            {infoLabels && (
              <div>
                {infoLabels.map((item: any) => (
                  <Button
                    variant={item?.color}
                    key={nanoid()}
                    className="ms-1 btn-sm mb-1"
                    style={{ color: "var(--black)" }}
                  >
                    {item?.name}
                  </Button>
                ))}
              </div>
            )}
            {childrenPosition == "left" && children}
          </div>
        </JustifyContent>
        // )
      }
    </>
  );
}

export default React.memo(TableDataListActionNew);
