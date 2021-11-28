import {Char} from "@miniskylab/antimatter-typescript";
import React from "react";

export function isAllowedKey(keyboardEvent: React.KeyboardEvent<HTMLInputElement>): boolean
{
    if (
        (!keyboardEvent.altKey && keyboardEvent.ctrlKey && !keyboardEvent.shiftKey && Char.isA(keyboardEvent.keyCode)) ||
        (!keyboardEvent.altKey && keyboardEvent.ctrlKey && !keyboardEvent.shiftKey && Char.isC(keyboardEvent.keyCode)) ||
        (!keyboardEvent.altKey && keyboardEvent.ctrlKey && !keyboardEvent.shiftKey && Char.isV(keyboardEvent.keyCode)) ||
        (!keyboardEvent.altKey && keyboardEvent.ctrlKey && !keyboardEvent.shiftKey && Char.isX(keyboardEvent.keyCode)) ||
        (!keyboardEvent.altKey && !keyboardEvent.ctrlKey && keyboardEvent.shiftKey && Char.isRightArrow(keyboardEvent.keyCode)) ||
        (!keyboardEvent.altKey && !keyboardEvent.ctrlKey && keyboardEvent.shiftKey && Char.isLeftArrow(keyboardEvent.keyCode)) ||
        (!keyboardEvent.altKey && !keyboardEvent.ctrlKey && Char.isHome(keyboardEvent.keyCode)) ||
        (!keyboardEvent.altKey && !keyboardEvent.ctrlKey && Char.isEnd(keyboardEvent.keyCode))
    )
    {
        return true;
    }
    else if (keyboardEvent.shiftKey || keyboardEvent.ctrlKey || keyboardEvent.altKey)
    {
        return false;
    }
    else if (
        !Char.isDigit(keyboardEvent.keyCode) &&
        !Char.isBackspace(keyboardEvent.keyCode) &&
        !Char.isDelete(keyboardEvent.keyCode) &&
        !Char.isMinus(keyboardEvent.keyCode) &&
        !Char.isDot(keyboardEvent.keyCode) &&
        !Char.isTab(keyboardEvent.keyCode) &&
        !Char.isLeftArrow(keyboardEvent.keyCode) &&
        !Char.isRightArrow(keyboardEvent.keyCode)
    )
    {
        return false;
    }

    return true;
}
