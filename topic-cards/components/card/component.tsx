import {Button} from "@miniskylab/antimatter-button";
import {Html} from "@miniskylab/antimatter-html";
import {Icon, IconName} from "@miniskylab/antimatter-icon-legacy";
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
                    {ctaButtons.map((ctaButton, i) => (
                        <Button
                            key={i}
                            variant={ctaButton.variant ?? Variant.Button.Cta}
                            icon={ctaButton.icon}
                            text={ctaButton.text}
                            href={ctaButton.href}
                            target={ctaButton.target}
                            disabled={ctaButton.disabled}
                            onClick={undefined}
                        />
                    ))}
                    <Spacer variant={Variant.Spacer.Horizontal5px}/>
                </>
            )}
        </div>
    );
}
