import {Button as ButtonComponent} from "@miniskylab/antimatter-button";
import {ButtonDeserializerCreator} from "./deserializer-creator";

export const Button = new ButtonDeserializerCreator().createFrom(ButtonComponent);
export {Props} from "./model";
