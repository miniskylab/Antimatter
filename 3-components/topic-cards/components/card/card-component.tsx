import {Button} from "@miniskylab/antimatter-button";
import {Icon, IconName} from "@miniskylab/antimatter-icon";
import {Markdown} from "@miniskylab/antimatter-markdown";
import {Spacer} from "@miniskylab/antimatter-spacer";
import React from "react";
import {CardComponentProps} from "./models/card-component-props";
import {CtaButtonVariant, Horizontal15pxSpacerVariant, Horizontal5pxSpacerVariant} from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function CardComponent(props: CardComponentProps): JSX.Element
{
    return (
        <div className={props.variant["card"]}>
            {
                Object.values<string>(IconName).includes(props.icon)
                    ? <Icon className={props.variant["card__icon"]} iconName={props.icon}/>
                    : <img className={props.variant["card__icon"]} src={props.icon} alt={""}/>
            }
            <div className={props.variant["card__name"]}>{props.name}</div>
            <div className={props.variant["card__description"]}>{Markdown.render(props.description)}</div>
            {props.ctaButtons && props.ctaButtons.length > 0 && (
                <>
                    <Spacer variant={Horizontal15pxSpacerVariant}/>
                    {props.ctaButtons.map((x, i) => (
                        <Button
                            key={i}
                            variant={x.variant || CtaButtonVariant}
                            icon={x.icon}
                            text={x.text}
                            href={x.href}
                            target={x.target}
                            disabled={x.disabled}
                            onClick={undefined}
                        />
                    ))}
                    <Spacer variant={Horizontal5pxSpacerVariant}/>
                </>
            )}
        </div>
    );
}
