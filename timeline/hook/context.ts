import {useContext} from "react";
import {TimelineContext} from "../model";

export function useTimelineContext(): TimelineContext { return useContext(TimelineContext); }
