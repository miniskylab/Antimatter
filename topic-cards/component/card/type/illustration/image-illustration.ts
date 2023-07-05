import {IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {IsDefined} from "class-validator";
import {ImageSourcePropType} from "react-native";
import {Illustration} from "./illustration";

export class ImageIllustration extends Illustration
{
    readonly type = "image";


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly alt: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDefined()
    readonly source: ImageSourcePropType;
}
