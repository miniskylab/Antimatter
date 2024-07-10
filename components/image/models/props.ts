import {ComponentName, ComponentProps, IsDefined, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {type ImageSourcePropType} from "react-native";
import {type ImageStyle} from "./style";

@ComponentName("Image")
export class ImageProps extends ComponentProps<ImageStyle>
{
    /**
     * @see https://reactnative.dev/docs/image#source
     */
    @IsDefined()
    readonly source: ImageSourcePropType;


    /**
     * @see https://reactnative.dev/docs/image#alt
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly alt?: string;
}
