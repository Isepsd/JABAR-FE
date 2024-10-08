import React from 'react';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

export default function CardInfo({
  label,
  value,
  suffix,
  variant,
  height = '6.2rem',
  subname = '',
  fontSize = '2rem',
}: ICardInfo) {
  return (
    <>
      <Card
        bg={variant}
        key={variant}
        text={'white'}
        className='my-1'
        style={{ borderRadius: '0.7rem', minHeight: height }} // Ensure the card has minimum height
      >
        <Card.Body
          className='d-flex px-1'
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}
        >
          <BoxStatistic>
            <div className='d-flex justify-content-center font-weight-500 text-uppercase fs-6'>
              {label}
            </div>
            <div className='d-flex flex-column align-items-center'>
              <div className='d-flex align-items-center' style={{ fontSize: fontSize }}>
                <span>{value}</span> {/* Value */}
                {suffix && (
                  <span className="suffix ms-1">{suffix}</span> // Suffix with margin start
                )}
              </div>
              {subname && (
                <div className='d-flex justify-content-center mt-1'>
                  {subname}
                </div>
              )}
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
    font-size: 0.65em;
    line-height: 1.5;
  }
`;

interface ICardInfo {
  label?: string;
  variant?: string;
  value?: any;
  suffix?: any;
  height?: string;
  subname?: string;
  fontSize?: string;
}
