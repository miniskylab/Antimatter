import {ComponentProps} from "@miniskylab/antimatter-framework";
import {ReactNode} from "react";
import {Style} from "./style";

export type Props = ComponentProps<Style> & {
    readonly children: ReactNode;
    readonly id: string;
    readonly onReadyToUnmount: (transitionableId: string) => void;
}
