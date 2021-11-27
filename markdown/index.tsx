import React from "react";
import sanitizeHtml from "sanitize-html";
import Showdown from "showdown";
import MarkdownStyles from "./markdown.scss";

class _Markdown
{
    render(dangerousMarkdownText: string): JSX.Element
    {
        const markdownConverter = new Showdown.Converter({
            simpleLineBreaks: true
        });
        markdownConverter.setFlavor("github");

        const dangerousHtmlString = markdownConverter.makeHtml(dangerousMarkdownText);
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
                className={MarkdownStyles["markdown"]}
                dangerouslySetInnerHTML={{__html: sanitizedHtmlString}}
            />
        );
    }
}

export const Markdown = new _Markdown();
