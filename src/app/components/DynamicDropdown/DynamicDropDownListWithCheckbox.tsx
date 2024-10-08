import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import JqxDropDownList, { IDropDownListProps } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxdropdownlist';
import { API_PATH } from '@app/services/_path.service';
import axios from 'axios';
import { getAllByPath } from '@app/services/main.service';
import { get } from 'lodash';
import { Controller } from 'react-hook-form';

interface IDropDownListOptions {
    path?: any;
    pathServiceName: any,
    filterParams?: any,
    dataSources?: any;
    onSelected?: any;
    control?: any,
    defaultValue?: any,
    fieldName: string;
    errors?: any;
    displayMember: string,
    valueMember: string,
}

type CombineInterface = IDropDownListOptions & IDropDownListProps;

const DynamicDropDownListWithCheckbox = forwardRef(({
    path,
    pathServiceName,
    filterParams = {},
    displayMember,
    valueMember,
    theme, 
    checkboxes,
    filterable, 
    placeHolder, 
    width, 
    height,
    onSelected,
    control,
    defaultValue = '',
    fieldName,
    errors,
}: CombineInterface, ref) => {

    const [items, setItems] = useState([]);
    const dropDownList = useRef<JqxDropDownList>(null);
    const [pathService] = useState<string>(path ? path : get(API_PATH(), pathServiceName));
    const sc = axios.CancelToken.source();
    const getSelected = useRef<any>([]);

    useEffect(() => {
        fetchSomeData();
    }, []);

    const fetchSomeData = async () => {
        setTimeout(() => {
            const params = {
                page: -1,
                limit: -1,
                sort_by: displayMember,
                ...filterParams,
            };

            getAllByPath(pathService, params, sc.token)
                .then((response: any) => {
                    const { results } = response;
                    const modifiedResults:any = results.map((result: any) => ({
                        label: result[displayMember],
                        value: result[valueMember],
                    }));
                    setItems(modifiedResults);
                })
                .catch((error: any) => {
                    console.error('Error loading server data:', error);
                    setItems([]);
                });

        }, 1000); // Simulate a 1-second delay
    };
    //handle select or checked
    const handleSelect = (e:any) => {
        const checkedItems = e.args.item || [];
        if (checkedItems) {
            const selectedItem: any[] = [];
            if (checkboxes) {
                const items: any = dropDownList.current?.getCheckedItems();
                if (items) {
                    for (const item of items) {
                        selectedItem.push(item.value);
                    }
                }
            } else {
                const item: any = dropDownList.current?.getSelectedItem();
                selectedItem.push(item.value);
            }
            getSelected.current = selectedItem;
            onSelected(getSelected);
        }
    };
    //hanle clear selection
    const clearSelection = () => {
        if (checkboxes) {
            dropDownList.current?.uncheckAll();
        } else {
            dropDownList.current?.clearSelection();
        }
        getSelected.current = [];
        onSelected(getSelected);
    };

    useImperativeHandle(ref, () => ({
        clearSelection,
    }));

    return (
        <>
            <Controller
                control={control}
                name={fieldName}
                defaultValue={defaultValue}
                rules={{
                    required: true,
                    validate: () => getSelected.current.length > 0,
                }}
                render={({ field }) => (
                    <JqxDropDownList
                        ref={dropDownList}
                        width={width}
                        height={height}
                        displayMember={displayMember}
                        valueMember={valueMember}
                        source={items}
                        selectedIndex={-1}
                        placeHolder={placeHolder}
                        checkboxes={checkboxes}
                        filterable={filterable}
                        onCheckChange={(e) => {
                            handleSelect(e);
                            field.onChange(getSelected.current);
                        }}
                        onSelect={(e) => {
                            if (!checkboxes) {  // Only handle selection if checkboxes are false
                                handleSelect(e);
                                field.onChange(getSelected.current);
                            }
                        }}
                        theme={theme}
                    />
                )}
            />
            {errors[fieldName] && (
                <div className='invalid-feedback d-block'>
                    {errors[fieldName]?.message || 'This field is required'}
                </div>
            )}
        </>
    );
});

export default React.memo(DynamicDropDownListWithCheckbox);
