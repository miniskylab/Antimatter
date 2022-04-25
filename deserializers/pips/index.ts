import {Pips as PipsComponent} from "@miniskylab/antimatter-pips";
import {PipsDeserializerCreator} from "./deserializer-creator";

export const Pips = new PipsDeserializerCreator().createFrom(PipsComponent);
export {Props} from "./model";
