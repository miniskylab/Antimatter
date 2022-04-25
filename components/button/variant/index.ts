import OutlinedCircular from "./outlined-circular.scss";
import OutlinedRectangle from "./outlined-rectangle.scss";
import SolidRectangle from "./solid-rectangle.scss";

const variant = {OutlinedCircular, OutlinedRectangle, SolidRectangle};

type VariantType = keyof typeof variant;

export {VariantType as Type};
export const Value = {
    ...variant as Record<VariantType, Record<string, string>>
};
