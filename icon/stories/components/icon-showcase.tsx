import {Color} from "@miniskylab/antimatter-color-scheme";
import {Icon, IconVariant} from "@miniskylab/antimatter-icon";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IconItem} from "@storybook/blocks";
import React, {JSX} from "react";

type Props = { iconName: DefaultIconSet };
export function IconShowcase({iconName}: Props): JSX.Element
{
    return (
        <IconItem name={iconName}>
            <Icon
                name={iconName}
                style={iconProps => ({
                    ...IconVariant.Default(iconProps),
                    color: Color.White,
                    fontSize: 30
                })}
            />
        </IconItem>
    );
}
