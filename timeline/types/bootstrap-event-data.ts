import {ComponentProps} from "@miniskylab/antimatter-framework";
import {BootstrapEvent} from "../components";

export type BootstrapEventData = Omit<BootstrapEvent.Props, keyof ComponentProps<BootstrapEvent.Style>>;
