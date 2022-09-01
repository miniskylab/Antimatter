import {Label} from "@miniskylab/antimatter-label";
import {bem} from "@miniskylab/antimatter-model";
import {Description} from "@storybook/addon-docs";
import React from "react";
import {IntroProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Intro({
    className = "AntimatterStorybookIntroDefault",
    title,
    component
}: IntroProps): JSX.Element
{
    return (
        <div className={bem(className)}>
            <Label className={bem("Intro-ComponentName")} text={title}/>
            {component && <Description of={component}/>}
        </div>
    );
}
