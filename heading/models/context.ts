import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {HeadingProps} from "./props";

export const HeadingContext = createContext<HeadingContext>({});
export type HeadingContext = ComponentContext<HeadingProps>;
