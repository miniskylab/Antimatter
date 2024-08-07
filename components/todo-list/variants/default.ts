import {ButtonContextHook, type ButtonStyle} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {DropdownMenuContextHook, type DropdownMenuStyle, DropdownMenuVariant, MenuItemStatus} from "@miniskylab/antimatter-dropdown-menu";
import {CursorType, Layer} from "@miniskylab/antimatter-framework";
import {type IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {InputFieldContextHook, type InputFieldStyle, InputFieldVariant} from "@miniskylab/antimatter-input-field";
import {ProgressStripesContextHook, type ProgressStripesStyle, ProgressStripesVariant} from "@miniskylab/antimatter-motion-graphics";
import {PressableContextHook, type PressableStyle, PressableVariant} from "@miniskylab/antimatter-pressable";
import {type ScrollViewStyle} from "@miniskylab/antimatter-scroll-view";
import {type TextStyle, TextVariant} from "@miniskylab/antimatter-text";
import {type TextInputStyle} from "@miniskylab/antimatter-text-input";
import {type ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {DataListOperationMode, type DataListStyle, DataListVariant} from "@miniskylab/data-list";
import {ReminderItem} from "../components";
import {ReminderAnimationHook, ReminderContextHook} from "../hooks";
import {type ReminderStyle} from "../models";

const Reminder__Root: DataListStyle = function (viewProps)
{
    return {
        ...DataListVariant.Default(viewProps)
    };
};

const Reminder__ReminderItem__Root: PressableStyle = function (pressableProps, pressableState)
{
    const reminderContext = ReminderContextHook.useReminderContext();
    const reminderItemContext = ReminderItem.ContextHook.useReminderItemContext();

    const hasSelectedReminderItem = !!reminderContext.props.selectedReminderItem;
    const isSelectedReminderItem = reminderItemContext.props.id === reminderContext.props.selectedReminderItem?.id;

    return {
        ...PressableVariant.Default(pressableProps, pressableState),
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingTop: 8,
        paddingBottom: 10,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderStyle: "solid",
        borderColor: Color.Neutral,
        marginTop: -2,
        cursor: hasSelectedReminderItem ? CursorType.Default : CursorType.Pointer,
        animations: () =>
        {
            const flashHighlightAnimation = ReminderAnimationHook.useFlashHighlightAnimation();
            const verticalContractionAnimation = ReminderAnimationHook.useVerticalContractionAnimation(66, 2);

            return reminderItemContext.props.toBeDeleted
                ? [() => flashHighlightAnimation, () => verticalContractionAnimation]
                : [() => verticalContractionAnimation, () => flashHighlightAnimation];
        },
        animationOverride: {
            ...((!hasSelectedReminderItem && pressableState.hovered) || isSelectedReminderItem) && {
                zIndex: Layer.AlwaysOnTop,
                borderColor: Color.Primary,
                backgroundColor: Color.Primary__a10,
                ...reminderContext.props.mode === DataListOperationMode.Delete && {
                    borderColor: Color.Negative,
                    backgroundColor: Color.Negative__a10
                }
            },
            ...reminderItemContext.props.toBeDeleted && {
                paddingTop: 0,
                paddingBottom: 0,
                borderTopWidth: 0,
                borderBottomWidth: 0,
                cursor: CursorType.Default,
                zIndex: Layer.Higher
            }
        }
    };
};

const Reminder__ReminderItem__Icon: IconStyle = function (iconProps)
{
    const reminderItemContext = ReminderItem.ContextHook.useReminderItemContext();

    return {
        ...IconVariant.Default(iconProps),
        display: reminderItemContext.props.toBeDeleted ? "none" : "flex",
        width: 30,
        height: 30,
        fontSize: 28,
        color: Color.Neutral
    };
};

const Reminder__ReminderItem__NameAndTagContainer: ViewStyle = function (viewProps)
{
    const reminderItemContext = ReminderItem.ContextHook.useReminderItemContext();

    return {
        ...ViewVariant.Default(viewProps),
        display: reminderItemContext.props.toBeDeleted ? "none" : "flex",
        flexGrow: 1,
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: 0,
        height: "100%",
        paddingLeft: 5
    };
};

const Reminder__ReminderItem__NameInputField__Root: ViewStyle = function (viewProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const inheritedStyle = InputFieldVariant.Default(inputFieldContext.props).Root(viewProps);

    return {
        ...inheritedStyle,
        width: "95%",
        height: 23,
        marginTop: -1,
        backgroundColor: Color.Transparent
    };
};

const Reminder__ReminderItem__NameInputField__TextBox: TextInputStyle = function (textInputProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const inheritedStyle = InputFieldVariant.Default(inputFieldContext.props).TextBox(textInputProps);

    return {
        ...inheritedStyle,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        fontSize: 18,
        fontWeight: "bold",
        animations: undefined
    };
};

const Reminder__ReminderItem__NameInputField__Placeholder: TextStyle = function (textProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const inheritedStyle = InputFieldVariant.Default(inputFieldContext.props).Placeholder(textProps);

    return {
        ...inheritedStyle,
        display: inputFieldContext.props.value ? "none" : "flex",
        height: "100%",
        paddingLeft: 0,
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "italic",
        animations: undefined
    };
};

const Reminder__ReminderItem__NameInputField: InputFieldStyle = function (inputFieldProps)
{
    return {
        ...InputFieldVariant.Default(inputFieldProps),
        Root: Reminder__ReminderItem__NameInputField__Root,
        TextBox: Reminder__ReminderItem__NameInputField__TextBox,
        Placeholder: Reminder__ReminderItem__NameInputField__Placeholder
    };
};

const Reminder__ReminderItem__NameText: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        alignItems: "flex-start",
        width: "95%",
        height: 23,
        marginTop: -1,
        fontSize: 18,
        fontWeight: "bold",
        color: Color.Neutral
    };
};

const Reminder__ReminderItem__TagSelector__Root: ViewStyle = function (viewProps)
{
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props).Root(viewProps);

    return {
        ...inheritedStyle,
        width: "95%",
        height: 18,
        minHeight: undefined,
        marginHorizontal: 1,
        overflow: "hidden",
        cursor: CursorType.Default
    };
};

const Reminder__ReminderItem__TagSelector__SelectedItemContainer: PressableStyle = function ()
{
    return {
        display: "none"
    };
};

const Reminder__ReminderItem__TagSelector__Caret: ViewStyle = function ()
{
    return {
        display: "none"
    };
};

const Reminder__ReminderItem__TagSelector__Menu: ScrollViewStyle = function (scrollViewProps)
{
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props).Menu(scrollViewProps);

    return {
        ...inheritedStyle,
        flexDirection: "row",
        top: 0,
        height: "100%",
        paddingVertical: 0,
        marginVertical: 0,
        backgroundColor: Color.Transparent
    };
};

const Reminder__ReminderItem__TagSelector__MenuItem__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const menuItemKey = DropdownMenuContextHook.useMenuItemKeyContext();
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const menuItem = dropdownMenuContext.props.menuItems?.[menuItemKey];
    const isHighlighted = menuItem?.context?.includes(ReminderItem.TagMetadata.HighlightTarget);

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props)
        .MenuItem(buttonContext.props)
        .Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        flex: 1,
        width: "auto",
        height: "100%",
        minWidth: "auto",
        paddingVertical: 0,
        paddingHorizontal: 8,
        marginBottom: 0,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: isHighlighted ? Color.Positive : Color.Neutral,
        backgroundColor: menuItem?.status === MenuItemStatus.Selected || pressableState.pressed
            ? isHighlighted ? Color.Positive : Color.Neutral
            : pressableState.hovered
                ? isHighlighted ? Color.Positive__a10 : Color.Neutral__a10
                : Color.Transparent
    };
};

const Reminder__ReminderItem__TagSelector__MenuItem__Label: TextStyle = function (textProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();
    const menuItemKey = DropdownMenuContextHook.useMenuItemKeyContext();
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const menuItem = dropdownMenuContext.props.menuItems?.[menuItemKey];
    const isHighlighted = menuItem?.context?.includes(ReminderItem.TagMetadata.HighlightTarget);

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props)
        .MenuItem(buttonContext.props)
        .Label(textProps);

    return {
        ...inheritedStyle,
        paddingRight: 0,
        fontSize: 12,
        color: menuItem?.status === MenuItemStatus.Selected || pressableContext.state.pressed
            ? Color.Ambient
            : pressableContext.state.hovered
                ? Color.White
                : isHighlighted
                    ? Color.Positive
                    : Color.Neutral
    };
};

const Reminder__ReminderItem__TagSelector__MenuItem__Icon: IconStyle = function ()
{
    return {
        display: "none"
    };
};

const Reminder__ReminderItem__TagSelector__MenuItem: ButtonStyle = function (buttonProps)
{
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props).MenuItem(buttonProps);

    return {
        ...inheritedStyle,
        Root: Reminder__ReminderItem__TagSelector__MenuItem__Root,
        Label: Reminder__ReminderItem__TagSelector__MenuItem__Label,
        Icon: Reminder__ReminderItem__TagSelector__MenuItem__Icon
    };
};

const Reminder__ReminderItem__TagSelector__Divider: ViewStyle = function ()
{
    return {
        display: "none"
    };
};

const Reminder__ReminderItem__TagSelector: DropdownMenuStyle = function (dropdownMenuProps)
{
    return {
        ...DropdownMenuVariant.Default(dropdownMenuProps),
        Root: Reminder__ReminderItem__TagSelector__Root,
        SelectedItemContainer: Reminder__ReminderItem__TagSelector__SelectedItemContainer,
        Caret: Reminder__ReminderItem__TagSelector__Caret,
        Menu: Reminder__ReminderItem__TagSelector__Menu,
        MenuItem: Reminder__ReminderItem__TagSelector__MenuItem,
        Divider: Reminder__ReminderItem__TagSelector__Divider
    };
};

const Reminder__ReminderItem__TagContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "95%",
        height: 18,
        paddingLeft: 1,
        backgroundColor: Color.Transparent,
        overflow: "hidden"
    };
};

const Reminder__ReminderItem__Tag: TextStyle = function (textProps)
{
    const reminderItemContext = ReminderItem.ContextHook.useReminderItemContext();

    const isHighlighted = Object.values(reminderItemContext.props.tags ?? {})
        .some(
            tag => tag.status === ReminderItem.TagStatus.Selected &&
                   tag.metadata?.has(ReminderItem.TagMetadata.HighlightTarget)
        );

    return {
        ...TextVariant.Default(textProps),
        height: "100%",
        paddingHorizontal: 8,
        marginRight: 5,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: isHighlighted ? Color.Positive : Color.Neutral,
        fontSize: 12,
        color: Color.Background,
        backgroundColor: isHighlighted ? Color.Positive : Color.Neutral
    };
};

const Reminder__ReminderItem__ProgressStripes__Root: ViewStyle = function (viewProps)
{
    const progressStripesContext = ProgressStripesContextHook.useProgressStripesContext();

    const inheritedStyle = ProgressStripesVariant.Default(progressStripesContext.props).Root(viewProps);

    return {
        ...inheritedStyle,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: undefined,
        height: undefined,
        zIndex: Layer.Ambient
    };
};

const Reminder__ReminderItem__ProgressStripes__Stripe: ViewStyle = function (viewProps)
{
    const stripeIndex = ProgressStripesContextHook.useStripeIndexContext();
    const progressStripesContext = ProgressStripesContextHook.useProgressStripesContext();

    const inheritedStyle = ProgressStripesVariant.Default(progressStripesContext.props).Stripe(viewProps);

    return {
        ...inheritedStyle,
        width: 50,
        backgroundColor: stripeIndex % 2 === 0
            ? Color.White__a10
            : Color.Transparent
    };
};

const Reminder__ReminderItem__ProgressStripes: ProgressStripesStyle = function (progressStripesProps)
{
    return {
        ...ProgressStripesVariant.Default(progressStripesProps),
        Root: Reminder__ReminderItem__ProgressStripes__Root,
        Stripe: Reminder__ReminderItem__ProgressStripes__Stripe
    };
};

const Reminder__ReminderItem: ReminderItem.Style = function ()
{
    return {
        Root: Reminder__ReminderItem__Root,
        Icon: Reminder__ReminderItem__Icon,
        NameAndTagContainer: Reminder__ReminderItem__NameAndTagContainer,
        NameInputField: Reminder__ReminderItem__NameInputField,
        NameText: Reminder__ReminderItem__NameText,
        TagSelector: Reminder__ReminderItem__TagSelector,
        TagContainer: Reminder__ReminderItem__TagContainer,
        Tag: Reminder__ReminderItem__Tag,
        ProgressStripes: Reminder__ReminderItem__ProgressStripes
    };
};

export const Default: ReminderStyle = function ()
{
    return {
        Root: Reminder__Root,
        ReminderItem: Reminder__ReminderItem
    };
};
