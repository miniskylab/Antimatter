import {type AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {ReminderContext, ReminderProps} from "./models";
import * as Variant from "./variants";

/**
 * A component that alerts users of items they have input previously.
 */
export function Reminder({
    style = Variant.Default
}: ReminderProps): JSX.Element
{
    const props: AllPropertiesMustPresent<ReminderProps> = {
        style
    };

    const context = useMemo<ReminderContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <ReminderContext.Provider value={context}>
            <View style={computedStyle.Root}>

            </View>
        </ReminderContext.Provider>
    );
}
