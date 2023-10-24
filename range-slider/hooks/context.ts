import {useContext} from "react";
import {RangeSliderContext} from "../models";

export function useRangeSliderContext(): RangeSliderContext { return useContext(RangeSliderContext); }
