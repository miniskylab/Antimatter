import {useContext} from "react";
import {HeadingContext} from "../model";

export function useHeadingContext(): HeadingContext { return useContext(HeadingContext); }
