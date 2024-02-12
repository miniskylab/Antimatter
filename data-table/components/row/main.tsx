import {DropDirection, DropdownMenu, MenuItemStatus} from "@miniskylab/antimatter-dropdown-menu";
import {AllPropertiesMustPresent, EMPTY_STRING, isNotNullAndUndefined, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {InputField} from "@miniskylab/antimatter-input-field";
import {Label} from "@miniskylab/antimatter-label";
import {Pressable} from "@miniskylab/antimatter-pressable";
import {Status as CheckboxStatus, Toggle} from "@miniskylab/antimatter-toggle";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo, useRef, useState} from "react";
import {Mode} from "./enums";
import {ColumnIndexContext, Props, RowContext, State} from "./models";
import {Measurement} from "./types";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    style,
    containerRef,
    data = [],
    columns = [],
    mode = Mode.ReadOnly,
    onPress,
    onChange
}: Props): JSX.Element | null
{
    const props: AllPropertiesMustPresent<Props> = {
        style, containerRef, data, columns, mode, onPress, onChange
    };

    const [state, setState] = useState<State>({
        openedDropdownMenuColumnIndex: undefined,
        dropdownMenuDropDirection: DropDirection.Down
    });

    const context = useMemo<RowContext>(
        () => ({props, state}),
        [...Object.values(props), ...Object.values(state)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props, state);

    const ref = useRef<Pressable>(null);

    if (mode === Mode.ReadOnly && state.openedDropdownMenuColumnIndex)
    {
        setState(prevState => ({...prevState, openedDropdownMenuColumnIndex: undefined}));
        return null;
    }

    return (
        <RowContext.Provider value={context}>
            <Pressable ref={ref} style={computedStyle.Root} onPress={onPress}>
                {renderRows()}
            </Pressable>
        </RowContext.Provider>
    );

    function renderRows(): JSX.Element[]
    {
        const rows: JSX.Element[] = [];
        const columnCount = Math.max(columns.length, data.length);
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++)
        {
            const cellValue = data[columnIndex];
            const column = columns[columnIndex];
            rows.push(
                <ColumnIndexContext.Provider key={columnIndex} value={columnIndex}>
                    {
                        mode === Mode.Draft || mode === Mode.Edit
                            ? renderEditor()
                            : renderValue()
                    }
                </ColumnIndexContext.Provider>
            );

            function renderEditor(): JSX.Element | null
            {
                switch (typeof cellValue)
                {
                    case "object":
                    {
                        return (
                            <DropdownMenu
                                menuItems={cellValue}
                                placeholder={column?.placeholder}
                                style={computedStyle.CellDropdownMenu}
                                isOpen={state.openedDropdownMenuColumnIndex === columnIndex}
                                dropDirection={state.dropdownMenuDropDirection}
                                onSelectedItemContainerPress={async () =>
                                {
                                    const dropDirection = await getDropDirectionAsync();
                                    setState(prevState => ({
                                        ...prevState,
                                        dropdownMenuDropDirection: dropDirection,
                                        openedDropdownMenuColumnIndex: prevState.openedDropdownMenuColumnIndex ? undefined : columnIndex
                                    }));
                                }}
                                onMenuItemPress={pressedMenuItemKey =>
                                {
                                    const selectedMenuItemValues = Object.keys(cellValue)
                                        .filter(menuItemValue => cellValue[menuItemValue].status === MenuItemStatus.Selected);

                                    const newCellValue = {...cellValue};
                                    selectedMenuItemValues.forEach(selectedMenuItemValue =>
                                    {
                                        const selectedMenuItem = newCellValue[selectedMenuItemValue];
                                        newCellValue[selectedMenuItemValue] = {
                                            ...selectedMenuItem,
                                            status: undefined
                                        };
                                    });

                                    const pressedMenuItem = cellValue[pressedMenuItemKey];
                                    newCellValue[pressedMenuItemKey] = {
                                        ...pressedMenuItem,
                                        status: pressedMenuItem.status === undefined
                                            ? MenuItemStatus.Selected
                                            : pressedMenuItem.status === MenuItemStatus.Selected
                                                ? undefined
                                                : pressedMenuItem.status
                                    };

                                    setState(prevState => ({
                                        ...prevState,
                                        openedDropdownMenuColumnIndex: undefined
                                    }));

                                    onChange?.(data.map((oldCellValue, i) => i === columnIndex ? newCellValue : oldCellValue));
                                }}
                            />
                        );
                    }

                    case "boolean":
                    {
                        return (
                            <Toggle
                                style={computedStyle.CellToggle}
                                icon={DefaultIconSet.CheckMark}
                                status={cellValue ? CheckboxStatus.Checked : CheckboxStatus.Unchecked}
                                onChange={newStatus =>
                                {
                                    const newValue = newStatus === CheckboxStatus.Checked;
                                    onChange?.(data.map((oldCellValue, i) => i === columnIndex ? newValue : oldCellValue));
                                }}
                            />
                        );
                    }

                    case "string":
                    {
                        return (
                            <InputField
                                value={cellValue as string}
                                autoFocus={columnIndex === 0}
                                placeholder={column?.placeholder}
                                style={computedStyle.CellInputField}
                                onChangeText={newValue =>
                                {
                                    onChange?.(data.map((oldCellValue, i) => i === columnIndex ? newValue : oldCellValue));
                                }}
                            />
                        );
                    }

                    default:
                        return null;
                }
            }

            function renderValue(): JSX.Element | null
            {
                switch (typeof cellValue)
                {
                    case "object":
                    {
                        const selectedMenuItemValue = Object.keys(cellValue)
                            .find(menuItemValue => cellValue[menuItemValue].status === MenuItemStatus.Selected);

                        return (
                            <Label style={computedStyle.CellLabel} numberOfLines={1}>
                                {
                                    isNotNullAndUndefined(selectedMenuItemValue)
                                        ? cellValue[selectedMenuItemValue].displayText
                                        : selectedMenuItemValue
                                }
                            </Label>
                        );
                    }

                    case "boolean":
                    {
                        return cellValue
                            ? <Icon style={computedStyle.CellIcon} name={DefaultIconSet.CheckMark}/>
                            : <Label style={computedStyle.CellLabel}>{EMPTY_STRING}</Label>;
                    }

                    case "string":
                    {
                        return (<Label style={computedStyle.CellLabel} numberOfLines={1}>{cellValue}</Label>);
                    }

                    default:
                        return null;
                }
            }
        }

        return rows;
    }

    async function getDropDirectionAsync(): Promise<DropDirection>
    {
        return new Promise(resolve =>
        {
            if (!containerRef?.current)
            {
                resolve(DropDirection.Down);
            }

            const container = containerRef?.current as View;
            let containerMeasurement: Measurement;
            let rowMeasurement: Measurement;

            container.measure((x, y, width, height, pageX, pageY) =>
            {
                containerMeasurement = {x, y, width, height, pageX, pageY};
                tryResolvePromise();
            });

            ref.current?.measure((x, y, width, height, pageX, pageY) =>
            {
                rowMeasurement = {x, y, width, height, pageX, pageY};
                tryResolvePromise();
            });

            function tryResolvePromise(): void
            {
                const measurementCompleted = !!(containerMeasurement && rowMeasurement);
                if (measurementCompleted)
                {
                    const rowVerticalPosition = rowMeasurement.pageY - containerMeasurement.pageY + (rowMeasurement.height / 2);
                    const dropDirection = rowVerticalPosition > (containerMeasurement.height / 2)
                        ? DropDirection.Up
                        : DropDirection.Down;

                    resolve(dropDirection);
                }
            }
        });
    }
}
