import {IsOptional} from "class-validator";

export class ComponentProps<TStyle>
{
    // noinspection JSValidateJSDoc
    /**
     * <b className="property-description__supported-platform-section">
     *     Supported Platforms:
     *     <b className="property-description__supported-platform-value--iOS">iOS</b>,
     *     <b className="property-description__supported-platform-value--android">Android</b>,
     *     <b className="property-description__supported-platform-value--web">Web</b>
     * </b>
     *
     * Set the look and feel of this component.
     * The look and feel includes: size, shape, color and anything else you can do with CSS.
     *
     * @type ComponentStyle
     */
    @IsOptional()
    readonly style?: TStyle;
}
