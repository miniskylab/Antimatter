import {useContext} from "react";
import {HeadingContext} from "../models";

export function useHeadingContext(): HeadingContext { return useContext(HeadingContext); }
