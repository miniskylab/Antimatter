import React, {JSX} from "react";
import sanitizeHtml from "sanitize-html";
import {Environment, useEnvironment} from "../environment";
import "./index.css";

export const Html = new class
{
    render(dangerousHtmlString: string): JSX.Element
    {
        const isWebEnvironment = useEnvironment(Environment.Web);
        if (!isWebEnvironment)
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
};
