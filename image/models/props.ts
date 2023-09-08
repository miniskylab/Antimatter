import {ComponentName, ComponentProps, IsDefined, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {ImageSourcePropType} from "react-native";
import {ImageStyle} from "./style";

@ComponentName("Image")
export class ImageProps extends ComponentProps<ImageStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDefined()
    readonly source: ImageSourcePropType;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly alt?: string;
}
