import {ComponentName, ComponentProps, IsDefined, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {ImageResizeMode} from "react-native";
import {ImageStyle} from "./style";

@ComponentName("Image")
export class ImageProps extends ComponentProps<ImageStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly uri: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly alt?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly resizeMode?: ImageResizeMode;
}
