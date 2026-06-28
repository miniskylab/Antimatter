import {Button} from "@miniskylab/antimatter-button";
import {type AllPropertiesMustPresent, Ts, useComponentContext, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {ProgressStripes} from "@miniskylab/antimatter-motion-graphics";
import {Text} from "@miniskylab/antimatter-text";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {forwardRef, JSX, RefObject, useEffect, useImperativeHandle, useRef} from "react";
import {Status} from "./enums";
import {FileRowContext, type Props, type Ref} from "./models";

export const Component = forwardRef(function Component(
    {
        style,
        icon = DefaultIconSet.Document,
        title,
        subtitle,
        status = Status.Pending,
        onProcess,
        onFulfill,
        onReject,
        onDelete
    }: Props,
    ref: RefObject<Ref>
): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, icon, title, subtitle, status, onProcess, onFulfill, onReject, onDelete
    };

    const rootContainerRef = useRef<View<Ref>>(null);

    const context = useComponentContext<FileRowContext>({props});

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    useImperativeHandle(ref, () => ({
        flashHighlight: rootContainerRef.current?.flashHighlight
    }), []);

    useEffect(() =>
    {
        if (status !== Status.Pending)
        {
            return;
        }

        onProcess?.()
            ?.then(() => { onFulfill?.(); })
            ?.catch(() => { onReject?.(); });
    }, []);

    return (
        <FileRowContext.Provider value={context}>
            <View ref={rootContainerRef} style={computedStyle.Root}>
                {status === Status.Processing && (<ProgressStripes style={computedStyle.ProgressStripes} msAnimationDuration={500}/>)}
                <Icon style={computedStyle.Icon} name={icon}/>
                <View style={computedStyle.TitleContainer}>
                    <Text style={computedStyle.MainTitle} numberOfLines={1}>{title}</Text>
                    <Text style={computedStyle.Subtitle} numberOfLines={1}>{subtitle}</Text>
                </View>
                <View style={computedStyle.ControlContainer}>
                    {(status !== Status.Processing) && (
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
});
