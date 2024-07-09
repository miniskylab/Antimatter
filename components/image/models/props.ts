import {ComponentName, ComponentProps, IsDefined, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {type ImageSourcePropType} from "react-native";
import {type ImageStyle} from "./style";

@ComponentName("Image")
export class ImageProps extends ComponentProps<ImageStyle>
{
    /**
     * The image source (either a remote URL or a local file resource).
     */
    @IsDefined()
    readonly source: ImageSourcePropType;


    /**
     * A string that defines an alternative text description of the image, which will be read by the screen reader when the user interacts
     * with it. Using this will automatically mark this element as accessible.
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly alt?: string;
}
