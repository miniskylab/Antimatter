import {useContext} from "react";
import {CardContext} from "../models";

export function useCardContext(): CardContext { return useContext(CardContext); }
