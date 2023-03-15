import {Button} from "@miniskylab/antimatter-button";
import {Decade, EMPTY_STRING, GregorianCalendar} from "@miniskylab/antimatter-framework";
import React from "react";
import {Animated} from "react-native";
import {Props} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    style,
    displayingDecade,
    onYearClick
}: Props): JSX.Element
{
    const {style: _, ...propsWithoutStyle} = arguments[0] as Props;
    const Style = style(propsWithoutStyle);

    return (
        <Animated.View style={Style.Root}>
            {renderGrid()}
        </Animated.View>
    );

    function renderGrid(): JSX.Element[]
    {
        const yearGrid: JSX.Element[] = [];
        const nextDecade = (displayingDecade + GregorianCalendar.YEAR_COUNT_IN_DECADE) as Decade;
        for (let year = displayingDecade; year < nextDecade; year++)
        {
            yearGrid.push(renderGridCell(year, nextDecade));
        }

        yearGrid.unshift(renderGridCell(displayingDecade - 1, nextDecade));
        yearGrid.unshift(renderGridCell(displayingDecade - 2, nextDecade));
        yearGrid.unshift(renderGridCell(displayingDecade - 3, nextDecade));

        yearGrid.push(renderGridCell(nextDecade, nextDecade));
        yearGrid.push(renderGridCell(nextDecade + 1, nextDecade));
        yearGrid.push(renderGridCell(nextDecade + 2, nextDecade));

        return yearGrid;
    }

    function renderGridCell(year: number, nextDecade: Decade): JSX.Element
    {
        const outOfSupportedYearRange = year < GregorianCalendar.MIN_YEAR || GregorianCalendar.MAX_YEAR < year;
        return (
            <Button
                key={year}
                style={Style.GridCell(year, nextDecade)}
                label={outOfSupportedYearRange ? EMPTY_STRING : year.toString()}
                onClick={outOfSupportedYearRange ? undefined : () => { onYearClick(year); }}
                disabled={outOfSupportedYearRange}
            />
        );
    }
}
