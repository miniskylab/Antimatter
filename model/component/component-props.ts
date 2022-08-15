import {IsOptional} from "class-validator";

export class ComponentProps
{
    /**
     * Set the look and feel of this component.
     * The look and feel includes: size, shape, color and anything else you can do with CSS.
     */
    @IsOptional()
    readonly className?: string;
}
