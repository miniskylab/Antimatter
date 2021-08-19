import React from "react";
import MarkdownComponent from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, {defaultSchema} from "rehype-sanitize";
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
                        {
                            ...defaultSchema,
                            attributes: {
                                ...defaultSchema.attributes,
                                "*": [
                                    ...defaultSchema.attributes["*"],
                                    "className"
                                ]
                            }
                        }
                    ]
                ]}
            >
                {text}
            </MarkdownComponent>
        );
    }
}

export const Markdown = new _Markdown();
