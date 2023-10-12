import {ButtonContextHook, ButtonStyle, ButtonVariant} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {Style} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {LabelStyle, LabelVariant} from "@miniskylab/antimatter-label";
import {PressableContextHook, PressableStyle, PressableVariant} from "@miniskylab/antimatter-pressable";
import {ScrollViewStyle, ScrollViewVariant} from "@miniskylab/antimatter-scroll-view";
import {ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {DropDirection, MenuItemStatus} from "../enums";
import {DropdownMenuContextHook} from "../hooks";
import {DropdownMenuStyle} from "../models";

const DropdownMenu__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        width: 220,
        minHeight: 34
    };
};

const DropdownMenu__SelectedItemContainer: PressableStyle = function (pressableProps, pressableState)
{
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    return {
        ...PressableVariant.Default(pressableProps, pressableState),
        flexDirection: "row",
        alignSelf: "stretch",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        gap: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: !dropdownMenuContext.props.isOpen && pressableState.hovered
            ? Color.Primary
            : Color.Transparent,
        backgroundColor: !dropdownMenuContext.props.isOpen && pressableState.hovered
            ? Color.Primary__a10
            : Color.Mineshaft
    };
};

const DropdownMenu__SelectedItem: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        maxWidth: "90%",
        lineHeight: 16,
        paddingVertical: 1,
        paddingHorizontal: 8,
        fontSize: 12,
        color: Color.Background,
        backgroundColor: Color.Neutral
    };
};

const DropdownMenu__Placeholder: LabelStyle = function (labelProps)
{
    const pressableContext = PressableContextHook.usePressableContext();
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    return {
        ...LabelVariant.Default(labelProps),
        alignItems: "flex-start",
        width: "100%",
        lineHeight: 18,
        paddingRight: 15,
        fontSize: 14,
        color: !dropdownMenuContext.props.isOpen && pressableContext.state.hovered
            ? Color.White
            : Color.Gray__a65
    };
};

const DropdownMenu__Caret: ViewStyle = function (viewProps)
{
    const pressableContext = PressableContextHook.usePressableContext();
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    return {
        ...ViewVariant.Default(viewProps),
        position: "absolute",
        top: 14.5,
        right: 10,
        width: 0,
        height: 0,
        borderWidth: 5,
        borderStyle: "solid",
        borderColor: Color.Transparent,
        borderTopColor: !dropdownMenuContext.props.isOpen && pressableContext.state.hovered
            ? Color.White
            : Color.Neutral
    };
};

const DropdownMenu__Menu: ScrollViewStyle = function (scrollViewProps)
{
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    return {
        ...ScrollViewVariant.Default(scrollViewProps),
        display: dropdownMenuContext.props.isOpen ? "flex" : "none",
        flexDirection: "column",
        position: "absolute",
        top: "100%",
        gap: 5,
        width: "100%",
        paddingVertical: 5,
        marginVertical: 5,
        backgroundColor: Color.Mineshaft,
        zIndex: Style.Layer.ContextMenu,
        cursor: "default",
        ...dropdownMenuContext.props.dropDirection === DropDirection.Up && {
            top: "auto",
            bottom: "100%"
        }
    };
};

const DropdownMenu__MenuItem__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const menuItemContext = DropdownMenuContextHook.useMenuItemContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        justifyContent: "flex-start",
        width: "100%",
        height: 30,
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: menuItemContext.status === MenuItemStatus.Selected || pressableState.pressed
            ? Color.Primary
            : pressableState.hovered
                ? Color.Primary__a10
                : Color.Transparent,
        borderColor: menuItemContext.status === MenuItemStatus.Selected || pressableState.hovered
            ? Color.Primary
            : Color.Transparent
    };
};

const DropdownMenu__MenuItem__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();
    const menuItemContext = DropdownMenuContextHook.useMenuItemContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        position: "absolute",
        right: 7,
        fontSize: 16,
        color: menuItemContext.status === MenuItemStatus.Selected
            ? Color.Ambient
            : pressableContext.state.pressed
                ? Color.Ambient
                : pressableContext.state.hovered
                    ? Color.White
                    : Color.Neutral
    };
};

const DropdownMenu__MenuItem__Label: LabelStyle = function (labelProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();
    const menuItemContext = DropdownMenuContextHook.useMenuItemContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Label(labelProps);

    return {
        ...inheritedStyle,
        width: "100%",
        alignItems: "flex-start",
        paddingLeft: 0,
        paddingRight: 20,
        color: menuItemContext.status === MenuItemStatus.Selected
            ? Color.Ambient
            : pressableContext.state.pressed
                ? Color.Ambient
                : pressableContext.state.hovered
                    ? Color.White
                    : Color.Neutral
    };
};

const DropdownMenu__MenuItem: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedRectangular(buttonProps),
        Root: DropdownMenu__MenuItem__Root,
        Icon: DropdownMenu__MenuItem__Icon,
        Label: DropdownMenu__MenuItem__Label
    };
};

const DropdownMenu__Divider: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        width: "100%",
        height: 1,
        backgroundColor: Color.Gray__a65
    };
};

export const Default: DropdownMenuStyle = function ()
{
    return {
        Root: DropdownMenu__Root,
        SelectedItemContainer: DropdownMenu__SelectedItemContainer,
        SelectedItem: DropdownMenu__SelectedItem,
        Placeholder: DropdownMenu__Placeholder,
        Caret: DropdownMenu__Caret,
        Menu: DropdownMenu__Menu,
        Divider: DropdownMenu__Divider,
        MenuItem: DropdownMenu__MenuItem
    };
};
