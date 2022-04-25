import {NumericInputField as NumericInputFieldComponent} from "@miniskylab/antimatter-numeric-input-field";
import {NumericInputFieldDeserializerCreator} from "./deserializer-creator";

export const NumericInputField = new NumericInputFieldDeserializerCreator().createFrom(NumericInputFieldComponent);
export {Props} from "./model";
