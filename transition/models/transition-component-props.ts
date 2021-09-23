import {ComponentName, ComponentProps} from "@miniskylab/antimatter/infrastructures";
import {IsDefined, IsInteger, IsPositive} from "@miniskylab/antimatter/validation";
import {IsOptional} from "class-validator";
import {Key} from "react";
import {CSSTransitionClassNames} from "react-transition-group/CSSTransition";

@ComponentName("Transition")
export class TransitionComponentProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsPositive()
    @IsInteger()
    @IsOptional()
    readonly msTimeout?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDefined()
    readonly childIdentifier: Key;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly classNames?: CSSTransitionClassNames;
}
