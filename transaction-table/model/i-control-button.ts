import React from "react";

export interface IControlButton
{
    modifier?: string;
    icon?: string;
    text?: string;
    onClick?: React.MouseEventHandler;
}
