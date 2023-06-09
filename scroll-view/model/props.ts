import {ComponentName, ComponentProps, IsBoolean} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {ReactNode} from "react";
import {ScrollViewStyle} from "./style";

@ComponentName("Scroll View")
export class ScrollViewProps extends ComponentProps<ScrollViewStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly children?: ReactNode;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly horizontal?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly showsVerticalScrollIndicator?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly showsHorizontalScrollIndicator?: boolean;
}
