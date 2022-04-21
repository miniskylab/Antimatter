import {InputField as InputFieldComponent} from "@miniskylab/antimatter-input-field";
import {InputFieldDeserializerCreator} from "./deserializer-creator";

export const InputField = new InputFieldDeserializerCreator().createFrom(InputFieldComponent);
