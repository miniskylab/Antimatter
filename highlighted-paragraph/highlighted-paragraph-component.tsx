import {Icon} from "antimatter/icon";
import {Markdown} from "antimatter/markdown";
import React from "react";
import {HighlightedParagraphComponentProps} from "./models/highlighted-paragraph-component-props";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function HighlightedParagraphComponent(props: HighlightedParagraphComponentProps): JSX.Element
{
    return (
        <div className={props.variant["highlighted-paragraph"]}>
            {(props.icon || props.title) && (
                <div className={props.variant["highlighted-paragraph__title"]}>
                    {props.icon && (
                        <Icon
                            className={props.variant["highlighted-paragraph__icon"]}
                            iconName={props.icon}
                        />
                    )}
                    {props.title && props.title}
                </div>
            )}
            {(props.title || props.icon) && props.text && <div className={props.variant["highlighted-paragraph__gap"]}/>}
            {props.text && (
                <div className={props.variant["highlighted-paragraph__text"]}>{Markdown.render(props.text)}</div>
            )}
        </div>
    );
}
