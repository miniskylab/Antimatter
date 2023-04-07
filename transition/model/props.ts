import {ComponentName, ComponentProps, IsDefined} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {ReactElement} from "react";
import {Animation} from "../enum";
import {
    CompositeTransitionSettings,
    NoneTransitionSettings,
    SlideTransitionSettings,
    TransitionSettings,
    ZoomTransitionSettings
} from "../type";
import {TransitionStyle} from "./style";

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
