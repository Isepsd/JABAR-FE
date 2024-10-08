import React, { FC } from 'react';
import { Form } from 'react-bootstrap';

type Props = {
  errors: any;
  register: any;
  type?: string;
  fieldName?: string;
  disabled?: boolean;
  step?: number;
  defaultValue?: string; // Added defaultValue as a prop
};

const InputDate: FC<Props> = ({
  errors,
  register,
  type = "date",
  fieldName = "date",
  disabled = false,
  step = 0,
  defaultValue // Accept defaultValue as a prop
}) => {

  // Ensure defaultValue is in "YYYY-MM-DD" format
  const formatDate = (date: string | undefined) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  return (
    <div className={`icheck-primary`}>
      <Form.Control
        {...register(fieldName)}
        isInvalid={errors[fieldName] as boolean | undefined}
        type={type}
        disabled={disabled}
        step={step}
        defaultValue={formatDate(defaultValue)} // Apply formatted defaultValue
      />
      <Form.Control.Feedback type='invalid'>
        {errors[fieldName]?.message}
      </Form.Control.Feedback>
    </div>
  );
}

export default InputDate;
