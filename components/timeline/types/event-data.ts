import {ComponentProps} from "@miniskylab/antimatter-framework";
import {Event} from "../components";

export type EventData = Omit<Event.Props, keyof ComponentProps<Event.Style> | "index">;
