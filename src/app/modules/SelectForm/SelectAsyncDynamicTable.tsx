import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import axios from 'axios';
import { debounce, get, orderBy, uniqBy } from 'lodash';
import AsyncSelect from 'react-select/async';
import { getAllByPath } from '@app/services/main.service';
import { ReactSelectStyle } from '@app/configs/react-select.config';
import { API_PATH } from '@app/services/_path.service';

interface IOption {
  readonly value: string;
  readonly label: string;
}

function SelectAsyncDynamicTable({
  control,
  fieldName,
  fieldNameParent,
  watchParent,
  errors,
  placeholder = 'Pilih...',
  pathServiceName,
  path,
  labelField,
  valueField,
  queryParams = {},
  setValue,
  required = false,
  isDisabled = false,
  isClearable = true,
  isMulti = false,
  styles = ReactSelectStyle,
  options,
  onChange: handleChange, // Tambahkan handleChange sebagai prop
}: ISelectAsyncDynamic) {
  const source = axios.CancelToken.source();
  const [selectOptions, setSelectOptions] = useState<IOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [idParent, setIdParent] = useState();
  const [inputValue, setInputValue] = useState(''); // State untuk menyimpan nilai input
  const [pathService] = useState<string>(path ? path : get(API_PATH(), pathServiceName));

  const getSelectOptions = (inputVal: string, callback?: (options: IOption[]) => void) => {
    setLoading(true);

    try {
      const parentField = fieldNameParent ? { [fieldNameParent]: watchParent || null } : {};

      const params = {
        page: 1,
        keyword: inputVal || undefined,
        limit: 30,
        ...parentField,
        ...queryParams,
        sort_by: labelField,
      };

      // if (isDisabled) {
      //   setLoading(false);
      //   return false;
      // }

      getAllByPath(pathService, params, source.token)
        .then((response: any) => {
          const data = response?.results.map((d: any) => ({
            label: d[labelField],
            value: d[valueField],
          }));

          setLoading(false);
          if (callback) {
            callback(data);
          }

          setSelectOptions(data);
        })
        .catch(() => {
          setLoading(false);
          if (callback) callback([]);
          else setSelectOptions([]);
        });
    } catch {
      setLoading(false);
    }
  };

  const loadOptions = (inputValue: string, callback: any) => {
    getSelectOptions(inputValue, (options) => {
      const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );


      const combinedOptions = uniqBy([...filteredOptions, ...selectOptions], 'value');
      callback(combinedOptions);
    });
  };

  const debouncedLoadOptions = debounce(loadOptions, 1000);

  useEffect(() => {
    if (idParent && watchParent && idParent !== watchParent) {
      if (setValue) setValue(fieldName, null);
    }
    setIdParent(watchParent);
    getSelectOptions('');
  }, [watchParent]);

  useEffect(() => {
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    if (options && selectOptions.length) {
      const checkOptionExist = selectOptions.find((opt) => opt.value === options[valueField]);
      if (!checkOptionExist) {
        const prependOptions = [{ label: options[labelField], value: options[valueField] }];
        setSelectOptions(orderBy(uniqBy([...prependOptions, ...selectOptions], 'value'), ['label'], ['asc']));
      }
    }
  }, [options, selectOptions]);

  return (
    <>
      <Controller
        control={control}
        defaultValue=""
        name={fieldName}
        rules={{ required }}
        render={({ field: { onChange, value, ref } }) => (
          <AsyncSelect
            placeholder={placeholder}
            ref={ref}
            value={
              selectOptions.find((opt) => opt.value === value) ||
              { label: inputValue, value: inputValue } // Ensure the inputValue is kept as a selectable option
            }
            onChange={(selectedOption: any) => {
              onChange(selectedOption ? selectedOption.value : null);
              setInputValue(''); // Clear inputValue only when an option is selected

              // Panggil onChange dari props jika ada
              if (handleChange) {
                handleChange(selectedOption ? selectedOption.value : null);
              }
            }}
            onInputChange={(newValue, { action }) => {
              if (action === 'input-change') {
                setInputValue(newValue); // Save the current input value
              }
            }}
            onBlur={() => {
              // Set value on blur if inputValue is not in selectOptions
              if (inputValue && !selectOptions.find((opt) => opt.value === inputValue)) {
                onChange(inputValue);
              }
            }}
            classNamePrefix={`${get(errors, fieldName) ? 'is-invalid' : ''}`}
            loadOptions={debouncedLoadOptions}
            defaultOptions={selectOptions}
            styles={styles}
            inputValue={inputValue} // Keep the input value in sync
            isLoading={loading}
            isDisabled={isDisabled}
            isClearable={isClearable}
            isMulti={isMulti}
            isSearchable
            onMenuOpen={() => {
              // Update inputValue when the menu opens
              const selectedOption = selectOptions.find((opt) => opt.value === value);
              if (selectedOption) {
                setInputValue(selectedOption.label);
              }
            }}
          />
        )}
      />
      {get(errors, fieldName) && (
        <div className="invalid-feedback d-block">
          {get(errors, fieldName)?.message}
        </div>
      )}
    </>
  );
}

// Update interface to include onChange
interface ISelectAsyncDynamic {
  pathServiceName: string;
  path?: string;
  labelField: any;
  valueField: any;
  queryParams?: any;
  fieldName: string;
  fieldNameParent?: string;
  watchParent?: any;
  control: any;
  errors: any;
  placeholder?: string;
  setValue?: any;
  isDisabled?: boolean;
  isClearable?: boolean;
  isMulti?: boolean;
  required?: boolean;
  options?: any;
  defaultValue?: any;
  styles?: any;
  onChange?: (value: any) => void; // Tambahkan tipe untuk onChange
}

export default SelectAsyncDynamicTable;
