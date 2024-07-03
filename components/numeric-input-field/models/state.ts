import {Selection} from "@miniskylab/antimatter-text-input";

export type NumericInputFieldState = {
    readonly selection: Selection | undefined;
    readonly userInput: string;
};
