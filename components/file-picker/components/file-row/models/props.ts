import {ComponentProps} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {Status} from "../enums";
import {type Style} from "./style";

export type Props = ComponentProps<Style> & {
    readonly icon?: DefaultIconSet;
    readonly title: string;
    readonly subtitle: string;
    readonly status?: Status;
    readonly onProcess?: () => Promise<void> | undefined;
    readonly onFulfill?: () => void;
    readonly onReject?: () => void;
    readonly onDelete?: () => void;
}
