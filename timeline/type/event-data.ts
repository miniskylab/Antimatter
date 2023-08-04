import {ComponentProps} from "@miniskylab/antimatter-framework";
import {Event} from "../component";

export type EventData = Omit<Event.Props, keyof ComponentProps<Event.Style> | "index">;
