import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";

export default function CardInfoNew({
  label,
  value,
  suffix,
  suffixBottom,
  variant,
  height = "",
  fontSize = "2rem",
}: ICardInfoNew) {
  return (
    <>
      <Card
        bg={variant}
        key={variant}
        text={"white"}
        className="my-1"
        style={{ borderRadius: "0.7rem" }}
      >
        <Card.Body className="d-flex px-1" style={{ height: height }}>
          <BoxStatistic>
            <div className="d-flex justify-content-center font-weight-500 text-uppercase fs-6">
              {label}
            </div>
            <div
              className={`d-flex justify-content-center `}
              style={{ fontSize: fontSize }}
            >
              <span className="suffix">
                {value} {suffix}
              </span>
            </div>
            <div
              className={`d-flex justify-content-center `}
              style={{ fontSize: fontSize }}
            >
              <span className="suffixbot">{suffixBottom}</span>
            </div>
          </BoxStatistic>
        </Card.Body>
      </Card>
    </>
  );
}

const BoxStatistic = styled.div`
  color: white;
  width: 100%;

  text-align: center;
  align-items: center;
  margin: auto;
  .suffix {
    font-size: 0.55em;
    line-height: 2;
  }
  .suffixbot {
    font-size: 0.35em;
    line-height: 1.5;
  }
`;

interface ICardInfoNew {
  label?: string;
  variant?: string;
  value?: any;
  suffix?: any;
  suffixBottom?: any;
  height?: any;
  fontSize?: any;
}
