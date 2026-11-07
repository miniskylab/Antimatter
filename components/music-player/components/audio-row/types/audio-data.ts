import {Props} from "../models";

export type AudioData = Omit<Props, "style" | "isSelected" | "onPress">;
