import {Button} from "@miniskylab/antimatter-button";
import {Html} from "@miniskylab/antimatter-html";
import {Icon, IconName} from "@miniskylab/antimatter-icon";
import {Spacer} from "@miniskylab/antimatter-spacer";
import React from "react";
import {Props} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component(props: Props): JSX.Element
{
    const {
        variant = Variant.ThirtyThreePercentWide,
        icon,
        name = String.EMPTY,
        description = String.EMPTY,
        ctaButtons = []
    } = props;

    return (
        <div className={variant["card"]}>
            {
                Object.values<string>(IconName).includes(icon)
                    ? <Icon className={variant["card__icon"]} iconName={icon}/>
                    : <img className={variant["card__icon"]} src={icon} alt={""}/>
            }
            <div className={variant["card__name"]}>{name}</div>
            <div className={variant["card__description"]}>{Html.render(description)}</div>
            {ctaButtons && ctaButtons.length > 0 && (
                <>
                    <Spacer variant={Variant.Spacer.Horizontal15px}/>
                    {ctaButtons.map((x, i) => (
                        <Button
                            key={i}
                            variant={x.variant || Variant.Button.Cta}
                            icon={x.icon}
                            text={x.text}
                            href={x.href}
                            target={x.target}
                            disabled={x.disabled}
                            onClick={undefined}
                        />
                    ))}
                    <Spacer variant={Variant.Spacer.Horizontal5px}/>
                </>
            )}
        </div>
    );
}
