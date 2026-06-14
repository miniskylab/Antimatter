import {Button} from "@miniskylab/antimatter-button";
import {type AllPropertiesMustPresent, Ts, useComponentContext, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {Text} from "@miniskylab/antimatter-text";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useEffect} from "react";
import {Status} from "./enums";
import {FileRowContext, Props} from "./models";

export function Component({
    style,
    icon = DefaultIconSet.Document,
    title,
    subtitle,
    status = Status.Pending,
    onProcess,
    onFulfill,
    onReject,
    onDelete
}: Props): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, icon, title, subtitle, status, onProcess, onFulfill, onReject, onDelete
    };

    const context = useComponentContext<FileRowContext>({props});

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    useEffect(() =>
    {
        if (status !== Status.Processing)
        {
            return;
        }

        onProcess?.()
            ?.then(() => { onFulfill?.(); })
            ?.catch(() => { onReject?.(); });
    }, []);

    return (
        <FileRowContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <Icon style={computedStyle.Icon} name={icon}/>
                <View style={computedStyle.TitleContainer}>
                    <Text style={computedStyle.MainTitle} numberOfLines={1}>{title}</Text>
                    <Text style={computedStyle.Subtitle} numberOfLines={1}>{subtitle}</Text>
                </View>
                <View style={computedStyle.ControlContainer}>
                    {status !== Status.Processing && (
                        <Button
                            style={computedStyle.DeleteButton}
                            icon={DefaultIconSet.XMark}
                            onPress={onDelete}
                        />
                    )}
                </View>
            </View>
        </FileRowContext.Provider>
    );
}
