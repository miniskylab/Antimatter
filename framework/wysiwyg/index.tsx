import React, {JSX} from "react";
import {isEnvironment} from "../functions";
import "./index.css";

export function render(dangerousHtmlString: string): JSX.Element
{
    if (!isEnvironment("Web"))
    {
        throw new Error("Raw HTML, Markdown & WYSIWYG can only be used inside web environment");
    }

    return (
        <div
            className={"antimatter-html"}
            dangerouslySetInnerHTML={{__html: dangerousHtmlString}}
        />
    );
}
