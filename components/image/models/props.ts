import {ComponentName, ComponentProps, IsDefined, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {type ImageSourcePropType} from "react-native";
import {type ImageStyle} from "./style";

@ComponentName("Image")
export class ImageProps extends ComponentProps<ImageStyle>
{
    @IsDefined()
    readonly source: ImageSourcePropType;


    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly alt?: string;
}
