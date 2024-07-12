import {ComponentName, ComponentProps, IsDefined} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {type ReactElement} from "react";
import {NoneTransitionSettings, SlideTransitionSettings, TransitionSettings, ZoomTransitionSettings} from "../classes";
import {Animation} from "../enums";
import type {CompositeTransitionSettings} from "../types";
import {type TransitionStyle} from "./style";

@ComponentName("Transition")
export class TransitionProps extends ComponentProps<TransitionStyle>
{
    /**
     * Specify the component that will undergo the transition.
     */
    @IsOptional()
    readonly children?: ReactElement;


    /**
     * Specify how the transition operates or behaves.
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => TransitionSettings, {
        keepDiscriminatorProperty: true,
        discriminator: {
            property: "animation",
            subTypes: [
                {name: Animation.None, value: NoneTransitionSettings},
                {name: Animation.Slide, value: SlideTransitionSettings},
                {name: Animation.Zoom, value: ZoomTransitionSettings}
            ]
        }
    })
    readonly settings: CompositeTransitionSettings;
}
