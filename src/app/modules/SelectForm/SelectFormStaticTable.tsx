import { ReactSelectStyle } from '@app/configs/react-select.config';
import React from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

export default function SelectFormStatic({
  control,
  errors,
  fieldName,
  placeholder = 'Pilih...',
  options,
  defaultValue = '',
  disabled,
  isClearable = true,
  onChange, // Tambahkan prop onChange
}: SelectFormStaticTable) {

  return (
    <>
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={fieldName}
        rules={{
          required: true,
        }}
        render={({ field: { onChange: fieldOnChange, value, ref } }) => (
          <Select
            placeholder={placeholder}
            styles={ReactSelectStyle}
            classNamePrefix={`${errors[fieldName] ? 'is-invalid' : ''}`}
            inputRef={ref}
            isDisabled={disabled}
            isClearable={isClearable}
            value={options.find((c: any) => c.value === value)} // Gunakan find untuk mendapatkan nilai yang sesuai
            onChange={(val: any) => {
              fieldOnChange(val?.value); // Mengubah nilai pada React Hook Form
              if (onChange) {
                onChange({ [fieldName]: val?.value }); // Mengirimkan fieldName=isi ke onChange handler
              }
            }}
            options={options}
          />
        )}
      />
      {errors[fieldName] && (
        <div className='invalid-feedback d-block'>
          {errors[fieldName]?.message}
        </div>
      )}
    </>
  );
}

interface SelectFormStaticTable {
  control: any;
  errors: any;
  fieldName: string;
  placeholder?: string;
  options: any;
  defaultValue?: any;
  disabled?: boolean;
  isClearable?: boolean;
  onChange?: (value: any) => void; // Tambahkan onChange ke interface
}
