import deepmerge from "deepmerge";
import {defaultSchema} from "hast-util-sanitize";
import React from "react";
import MarkdownComponent from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import GFM from "remark-gfm";
import MarkdownStyles from "./markdown.scss";

class _Markdown
{
    render(text: string): JSX.Element
    {
        return (
            <MarkdownComponent
                className={MarkdownStyles["markdown"]}
                plugins={[GFM]}
                rehypePlugins={[
                    rehypeRaw,
                    [
                        rehypeSanitize,
                        deepmerge(
                            defaultSchema,
                            {
                                attributes: {
                                    "*": ["className"]
                                }
                            }
                        )
                    ]
                ]}
            >
                {text}
            </MarkdownComponent>
        );
    }
}

export const Markdown = new _Markdown();
