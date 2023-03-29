import {IsOptional} from "class-validator";

export class ComponentProps<TStyle>
{
    /**
     * This property uniquely identifies a component instance.
     */
    @IsOptional()
    readonly id?: string;

    // noinspection JSValidateJSDoc
    /**
     * Set the look and feel of this component.
     * The look and feel includes: size, shape, color and anything else you can do with CSS.
     *
     * @type ComponentStyle
     */
    @IsOptional()
    readonly style?: TStyle;


    /**
     * This callback will be executed when a component is ready to unmount.
     * It is useful when doing animations before unmounting a component.
     */
    @IsOptional()
    readonly onReadyToUnmount?: (componentId: string) => void;
}
