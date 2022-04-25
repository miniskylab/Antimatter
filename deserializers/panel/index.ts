import {Panel as PanelComponent} from "@miniskylab/antimatter-panel";
import {PanelDeserializerCreator} from "./deserializer-creator";

export const Panel = new PanelDeserializerCreator().createFrom(PanelComponent);
export {Props} from "./model";
