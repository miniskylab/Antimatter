import React from "react";
import sanitizeHtml from "sanitize-html";
import "./html.scss";

export const Html = new class
{
    render(dangerousHtmlString: string): JSX.Element
    {
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
