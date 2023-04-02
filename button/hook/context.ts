import {useContext} from "react";
import {ButtonContext} from "../model";

export function useButtonContext(): ButtonContext { return useContext(ButtonContext); }
