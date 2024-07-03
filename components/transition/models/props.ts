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
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly children?: ReactElement;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
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
