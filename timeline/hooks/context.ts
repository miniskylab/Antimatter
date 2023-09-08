import {useContext} from "react";
import {TimelineContext} from "../models";

export function useTimelineContext(): TimelineContext { return useContext(TimelineContext); }
