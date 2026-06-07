import {Props} from "../models";

export type FileData = Omit<Props, "style" | "onDelete">;
