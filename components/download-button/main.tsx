import {Button} from "@miniskylab/antimatter-button";
import {
    type AllPropertiesMustPresent,
    EMPTY_STRING,
    isEnvironment,
    triggerDownload,
    Ts,
    useComponentContext,
    useComputedStyle
} from "@miniskylab/antimatter-framework";
import React, {JSX, useEffect, useState} from "react";
import {DownloadButtonContext, DownloadButtonProps, type DownloadButtonState} from "./models";
import * as Variant from "./variants";

/**
 * A component that users can press to trigger file download action.
 */
export function DownloadButton({
    style = Variant.Default,
    href = EMPTY_STRING,
    label = EMPTY_STRING,
    icon,
    fileName,
    disabled = false
}: DownloadButtonProps): JSX.Element
{
    if (!isEnvironment("Web"))
    {
        throw new Error("<DownloadButton/> can only be used inside web environment");
    }

    const props: AllPropertiesMustPresent<DownloadButtonProps> = {
        style, href, label, icon, fileName, disabled
    };

    const [state, setState] = useState<DownloadButtonState>({
        blobURL: href,
        disabled: true
    });

    const context = useComponentContext<DownloadButtonContext>({props, state});

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props, state);

    useEffect(() =>
    {
        (async function ()
        {
            if (state.disabled)
            {
                const response = await fetch(href);
                const blobURL = URL.createObjectURL(await response.blob());

                setState(prevState => ({
                    ...prevState,
                    blobURL,
                    disabled: false
                }));
            }
        })();
    }, []);

    return (
        <DownloadButtonContext.Provider value={context}>
            <Button
                style={computedStyle}
                label={label}
                icon={icon}
                disabled={disabled || state.disabled}
                onPress={() => { triggerDownload(state.blobURL, fileName ?? EMPTY_STRING); }}
            />
        </DownloadButtonContext.Provider>
    );
}
