import {ComponentProps, GestureResponderEventHandler} from "@miniskylab/antimatter-framework";
import {Style} from "./style";

export type Props = ComponentProps<Style> & {
    readonly songName: string;
    readonly secSongDuration: number;
    readonly singer?: string;
    readonly isSelected?: boolean;
    readonly isExcludedFromActivePlaylist?: boolean;
    readonly onPress?: GestureResponderEventHandler;
}
