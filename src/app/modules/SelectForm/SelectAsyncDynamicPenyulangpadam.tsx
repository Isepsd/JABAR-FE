import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import axios from 'axios';
import { debounce, get, orderBy } from 'lodash';
import AsyncSelect from 'react-select/async';
import { getAllByPath } from '@app/services/main.service';
import { ReactSelectStyle } from '@app/configs/react-select.config';
import { API_PATH } from '@app/services/_path.service';

interface IOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

function SelectAsyncDynamic({
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
}: ISelectAsyncDynamic) {
  const source = axios.CancelToken.source();
  const [selectOptions, setSelectOptions] = useState<IOption[]>([]);
  const [selectOptionsTemp, setSelectOptionsTemp] = useState<IOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [idParent, setIdParent] = useState<any>();
  const [pathService] = useState<string>(path || get(API_PATH(), pathServiceName));

  const getSelectOptions = (
    inputVal: string | undefined,
    callback?: (options: IOption[]) => void
  ) => {
    setLoading(true);

    const parentField = fieldNameParent ? { [fieldNameParent]: watchParent || null } : {};
    const params = {
      page: 1,
      keyword: inputVal || undefined,
      limit: 30,
      ...parentField,
      ...queryParams,
      sort_by: labelField,
    };

    if (isDisabled) {
      setLoading(false);
      return;
    }

    getAllByPath(pathService, params, source.token)
      .then((response: any) => {
        const data = response?.results.map((d: any) => ({
          label: d[labelField] + (d?.jabatan?.nama ? ` - ${d?.jabatan?.nama}` : ''),
          value: d[valueField],
        })) || [];

        setLoading(false);
        setSelectOptions(data);
        setSelectOptionsTemp(data);

        // Automatically select the top option if queryParams is passed
        if (queryParams && data.length > 0 && setValue) {
          setValue(fieldName, data[0].value); // Set the first option as the value
        }

        if (callback) {
          callback(data);
        }
      })
      .catch(() => {
        setLoading(false);
        if (callback) callback([]);
        else {
          setSelectOptions([]);
          setSelectOptionsTemp([]);
        }
      });
  };

  const loadOptions = (keyword: string, callback: (options: IOption[]) => void) => {
    const parentField = fieldNameParent ? { [fieldNameParent]: watchParent || null } : {};
    const paramsRequest = {
      page: 1,
      size: 30,
      keyword: keyword || undefined,
      ...queryParams,
      ...parentField,
    };

    getAllByPath(pathService, paramsRequest, source.token)
      .then((response: any) => {
        const data = response?.results.map((d: any) => ({
          label: d[labelField],
          value: d[valueField],
        })) || [];

        const newOptions = [...data, ...selectOptions];
        setSelectOptions(newOptions);
        setSelectOptionsTemp(newOptions);
        
        if (callback) {
          callback(data);
        }

        // Automatically select the top option if queryParams is passed
        if (queryParams && data.length > 0 && setValue) {
          setValue(fieldName, data[0].value); // Set the first option as the value
        }
      })
      .catch(() => {
        setLoading(false);
        if (callback) callback([]);
        else {
          setSelectOptions([]);
          setSelectOptionsTemp([]);
        }
      });
  };

  const debouncedSearchHandler = debounce(loadOptions, 1000);

  useEffect(() => {
    if (idParent && watchParent && idParent !== watchParent) {
      if (setValue) setValue(fieldName, null);
    }
    setIdParent(watchParent);
    getSelectOptions(undefined);
  }, [watchParent]);

  useEffect(() => {
    return () => {
      source.cancel();
      setSelectOptions([]);
    };
  }, []);

  useEffect(() => {
    if (options && selectOptionsTemp) {
      const checkOptionExist = get(selectOptionsTemp.filter((f: any) => f?.value === options[valueField]), '0');
      if (!checkOptionExist) {
        const prependOptions = [{ label: options[labelField], value: options[valueField] }];
        const o:any = orderBy([...prependOptions, ...selectOptions], ['label'], ['asc']);
        setSelectOptions(o);
      }
    }
  }, [options, selectOptionsTemp]);

  return (
    <>
      <Controller
        control={control}
        defaultValue={''}
        name={fieldName}
        rules={{ required }}
        render={({ field: { onChange, value, ref } }) => (
          isMulti ? (
            <AsyncSelect
              placeholder={placeholder}
              ref={ref}
              value={
                value
                  ? value.map((x: any) =>
                      selectOptions.find((y: any) => x === y.value)
                    )
                  : []
              }
              onChange={(val: any) => onChange(val.map((x: any) => x.value))}
              classNamePrefix={get(errors, fieldName) ? 'is-invalid' : ''}
              loadOptions={debouncedSearchHandler}
              defaultOptions={selectOptions}
              styles={styles}
              isLoading={loading}
              isDisabled={isDisabled}
              isClearable={isClearable}
              isMulti
            />
          ) : (
            <AsyncSelect
              placeholder={placeholder}
              ref={ref}
              value={selectOptions.find((c: any) => c.value === value)}
              onChange={(val: any) => onChange(val?.value || null)}
              classNamePrefix={get(errors, fieldName) ? 'is-invalid' : ''}
              loadOptions={debouncedSearchHandler}
              defaultOptions={selectOptions}
              styles={styles}
              isLoading={loading}
              isDisabled={isDisabled}
              isClearable={isClearable}
            />
          )
        )}
      />
      {get(errors, fieldName) && (
        <div className='invalid-feedback d-block'>
          {get(errors, fieldName)?.message}
        </div>
      )}
    </>
  );
}

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
  isSearchable?: boolean;
  isMulti?: boolean;
  required?: boolean;
  options?: any;
  defaultValue?: any;
  styles?: any;
}

export default SelectAsyncDynamic;
