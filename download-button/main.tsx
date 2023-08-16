import {Button} from "@miniskylab/antimatter-button";
import {EMPTY_STRING, Environment, useEnvironment} from "@miniskylab/antimatter-framework";
import React, {JSX, useEffect, useMemo, useState} from "react";
import {DownloadButtonContext, DownloadButtonProps, DownloadButtonState} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
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
    const runningOnWeb = useEnvironment(Environment.Web);
    if (!runningOnWeb)
    {
        throw new Error("<DownloadButton/> cannot be used on mobile!");
    }

    const props: Required<DownloadButtonProps> = {
        style, href, label, icon, fileName, disabled
    };

    const [state, setState] = useState<DownloadButtonState>({
        blobURL: href,
        disabled: true
    });

    const context = useMemo<DownloadButtonContext>(
        () => ({props, state}),
        [...Object.values(props), ...Object.values(state)]
    );

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    useEffect(() =>
    {
        (async function ()
        {
            if (state.disabled)
            {
                const response = await fetch(href);
                const blobURL = URL.createObjectURL(await response.blob());

                setState({
                    blobURL,
                    disabled: false
                });
            }
        })();
    }, []);

    return (
        <DownloadButtonContext.Provider value={context}>
            <Button
                style={computedStyle}
                label={label}
                icon={icon}
                onPress={onPress}
                disabled={disabled || state.disabled}
            />
        </DownloadButtonContext.Provider>
    );

    function onPress(): void
    {
        const hidden_a = document.createElement("a");
        hidden_a.style.display = "none";
        hidden_a.setAttribute("href", state.blobURL);
        hidden_a.setAttribute("download", fileName);
        hidden_a.setAttribute("target", "_self");

        document.body.appendChild(hidden_a);
        hidden_a.click();
        document.body.removeChild(hidden_a);
    }
}
