import {createContext} from "react";

export const ButtonContext = createContext<ButtonState>({
    hovered: false,
    pressed: false
});

export type ButtonState = {
    readonly hovered: boolean;
    readonly pressed: boolean;
};
