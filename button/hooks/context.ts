import {useContext} from "react";
import {ButtonContext} from "../models";

export function useButtonContext(): ButtonContext { return useContext(ButtonContext); }
