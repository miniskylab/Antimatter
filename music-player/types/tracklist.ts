import {SongRow} from "../components";

export type Tracklist = Omit<SongRow.Props, "style" | "onPress">[];
