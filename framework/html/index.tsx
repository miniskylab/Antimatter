import React, {JSX} from "react";
import sanitizeHtml from "sanitize-html";
import {Environment, useEnvironment} from "../styles";
import "./index.css";

export const Html = new class
{
    render(dangerousHtmlString: string): JSX.Element
    {
        const runningOnWeb = useEnvironment(Environment.Web);
        if (!runningOnWeb)
        {
            throw new Error("Raw HTML rendering, Markdown & WYSIWYG cannot be used on mobile!");
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
};
