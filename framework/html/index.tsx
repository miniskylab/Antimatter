import React, {JSX} from "react";
import sanitizeHtml from "sanitize-html";
import * as Environment from "../environment";
import "./index.css";

export function render(dangerousHtmlString: string): JSX.Element
{
    if (!Environment.is("Web"))
    {
        throw new Error("Raw HTML, Markdown & WYSIWYG can only be used inside web environment");
    }

    const sanitizedHtmlString = sanitizeHtml(
        dangerousHtmlString,
        {
            allowedAttributes: {
                "*": ["class"]
            }
        }
    );

    return (
        <div
            className={"antimatter-html"}
            dangerouslySetInnerHTML={{__html: sanitizedHtmlString}}
        />
    );
}
