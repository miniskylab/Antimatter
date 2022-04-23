import {IsOptional} from "class-validator";

export class ComponentProps
{
    /**
     * Select a variant for this component.
     *
     * A variant is a CSS file which defines the look and feel of a component.
     * The look and feel includes: size, shape, color and anything else you can do with CSS.
     */
    @IsOptional()
    readonly variant?: Record<string, string>;
}
