import {Color} from "@miniskylab/antimatter-color-scheme";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IconItem} from "@storybook/addon-docs/blocks";
import React, {JSX} from "react";
import {Icon} from "../../main";
import * as IconVariant from "../../variants";

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
