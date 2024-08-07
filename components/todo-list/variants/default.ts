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
import {DataListAnimationHook, DataListOperationMode, type DataListStyle, DataListVariant} from "@miniskylab/data-list";
import {Reminder} from "../components";
import {TodoListContextHook} from "../hooks";
import {type TodoListStyle} from "../models";

const TodoList__DataList: DataListStyle = function (dataListProps)
{
    return {
        ...DataListVariant.Default(dataListProps)
    };
};

const TodoList__Reminder__Root: PressableStyle = function (pressableProps, pressableState)
{
    const todoListContext = TodoListContextHook.useTodoListContext();
    const reminderContext = Reminder.ContextHook.useReminderContext();

    const hasSelectedReminder = !!todoListContext.props.selectedReminder;
    const isSelectedReminder = reminderContext.props.id === todoListContext.props.selectedReminder?.id;

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
        cursor: hasSelectedReminder ? CursorType.Default : CursorType.Pointer,
        animations: () =>
        {
            const flashHighlightAnimation = DataListAnimationHook.useFlashHighlightAnimation();
            const verticalContractionAnimation = DataListAnimationHook.useVerticalContractionAnimation(66, 2);

            return reminderContext.props.toBeDeleted
                ? [() => flashHighlightAnimation, () => verticalContractionAnimation]
                : [() => verticalContractionAnimation, () => flashHighlightAnimation];
        },
        animationOverride: {
            ...((!hasSelectedReminder && pressableState.hovered) || isSelectedReminder) && {
                zIndex: Layer.AlwaysOnTop,
                borderColor: Color.Primary,
                backgroundColor: Color.Primary__a10,
                ...reminderContext.props.mode === DataListOperationMode.Delete && {
                    borderColor: Color.Negative,
                    backgroundColor: Color.Negative__a10
                }
            },
            ...reminderContext.props.toBeDeleted && {
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

const TodoList__Reminder__Icon: IconStyle = function (iconProps)
{
    const reminderContext = Reminder.ContextHook.useReminderContext();

    return {
        ...IconVariant.Default(iconProps),
        display: reminderContext.props.toBeDeleted ? "none" : "flex",
        width: 30,
        height: 30,
        fontSize: 28,
        color: Color.Neutral
    };
};

const TodoList__Reminder__NameTagAndDeadlineContainer: ViewStyle = function (viewProps)
{
    const reminderContext = Reminder.ContextHook.useReminderContext();

    return {
        ...ViewVariant.Default(viewProps),
        display: reminderContext.props.toBeDeleted ? "none" : "flex",
        flexGrow: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        rowGap: 4,
        paddingLeft: 5
    };
};

const TodoList__Reminder__NameInputField__Root: ViewStyle = function (viewProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const inheritedStyle = InputFieldVariant.Default(inputFieldContext.props).Root(viewProps);

    return {
        ...inheritedStyle,
        width: "100%",
        height: 23,
        marginTop: -1,
        backgroundColor: Color.Transparent
    };
};

const TodoList__Reminder__NameInputField__TextBox: TextInputStyle = function (textInputProps)
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

const TodoList__Reminder__NameInputField__Placeholder: TextStyle = function (textProps)
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

const TodoList__Reminder__NameInputField: InputFieldStyle = function (inputFieldProps)
{
    return {
        ...InputFieldVariant.Default(inputFieldProps),
        Root: TodoList__Reminder__NameInputField__Root,
        TextBox: TodoList__Reminder__NameInputField__TextBox,
        Placeholder: TodoList__Reminder__NameInputField__Placeholder
    };
};

const TodoList__Reminder__NameText: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        alignItems: "flex-start",
        width: "100%",
        height: 23,
        marginTop: -1,
        fontSize: 18,
        fontWeight: "bold",
        color: Color.Neutral
    };
};

const TodoList__Reminder__DueDateIcon: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        lineHeight: 17,
        paddingBottom: 1,
        marginRight: 5,
        fontSize: 14,
        color: Color.Neutral
    };
};

const TodoList__Reminder__DueDate: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        lineHeight: 18,
        marginRight: 10,
        fontSize: 14,
        fontWeight: "bold",
        color: Color.Neutral
    };
};

const TodoList__Reminder__DueDurationIcon: IconStyle = function (iconProps)
{
    return {
        ...TodoList__Reminder__DueDateIcon(iconProps)
    };
};

const TodoList__Reminder__DueDuration: TextStyle = function (textProps)
{
    return {
        ...TodoList__Reminder__DueDate(textProps)
    };
};

const TodoList__Reminder__TagSelector__Root: ViewStyle = function (viewProps)
{
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props).Root(viewProps);

    return {
        ...inheritedStyle,
        height: 18,
        minHeight: undefined,
        marginHorizontal: 1,
        overflow: "hidden",
        cursor: CursorType.Default
    };
};

const TodoList__Reminder__TagSelector__SelectedItemContainer: PressableStyle = function ()
{
    return {
        display: "none"
    };
};

const TodoList__Reminder__TagSelector__Caret: ViewStyle = function ()
{
    return {
        display: "none"
    };
};

const TodoList__Reminder__TagSelector__Menu: ScrollViewStyle = function (scrollViewProps)
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

const TodoList__Reminder__TagSelector__MenuItem__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const menuItemKey = DropdownMenuContextHook.useMenuItemKeyContext();
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const menuItem = dropdownMenuContext.props.menuItems?.[menuItemKey];
    const isHighlighted = menuItem?.context?.includes(Reminder.TagMetadata.HighlightTarget);

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

const TodoList__Reminder__TagSelector__MenuItem__Label: TextStyle = function (textProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();
    const menuItemKey = DropdownMenuContextHook.useMenuItemKeyContext();
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const menuItem = dropdownMenuContext.props.menuItems?.[menuItemKey];
    const isHighlighted = menuItem?.context?.includes(Reminder.TagMetadata.HighlightTarget);

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

const TodoList__Reminder__TagSelector__MenuItem__Icon: IconStyle = function ()
{
    return {
        display: "none"
    };
};

const TodoList__Reminder__TagSelector__MenuItem: ButtonStyle = function (buttonProps)
{
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props).MenuItem(buttonProps);

    return {
        ...inheritedStyle,
        Root: TodoList__Reminder__TagSelector__MenuItem__Root,
        Label: TodoList__Reminder__TagSelector__MenuItem__Label,
        Icon: TodoList__Reminder__TagSelector__MenuItem__Icon
    };
};

const TodoList__Reminder__TagSelector__Divider: ViewStyle = function ()
{
    return {
        display: "none"
    };
};

const TodoList__Reminder__TagSelector: DropdownMenuStyle = function (dropdownMenuProps)
{
    return {
        ...DropdownMenuVariant.Default(dropdownMenuProps),
        Root: TodoList__Reminder__TagSelector__Root,
        SelectedItemContainer: TodoList__Reminder__TagSelector__SelectedItemContainer,
        Caret: TodoList__Reminder__TagSelector__Caret,
        Menu: TodoList__Reminder__TagSelector__Menu,
        MenuItem: TodoList__Reminder__TagSelector__MenuItem,
        Divider: TodoList__Reminder__TagSelector__Divider
    };
};

const TodoList__Reminder__TagContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        justifyContent: "flex-start",
        height: 18,
        paddingLeft: 1,
        backgroundColor: Color.Transparent,
        overflow: "hidden"
    };
};

const TodoList__Reminder__Tag: TextStyle = function (textProps)
{
    const reminderContext = Reminder.ContextHook.useReminderContext();

    const isHighlighted = Object.values(reminderContext.props.tags ?? {})
        .some(
            tag => tag.status === Reminder.TagStatus.Selected &&
                   tag.metadata?.has(Reminder.TagMetadata.HighlightTarget)
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

const TodoList__Reminder__ProgressStripes__Root: ViewStyle = function (viewProps)
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

const TodoList__Reminder__ProgressStripes__Stripe: ViewStyle = function (viewProps)
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

const TodoList__Reminder__ProgressStripes: ProgressStripesStyle = function (progressStripesProps)
{
    return {
        ...ProgressStripesVariant.Default(progressStripesProps),
        Root: TodoList__Reminder__ProgressStripes__Root,
        Stripe: TodoList__Reminder__ProgressStripes__Stripe
    };
};

const TodoList__Reminder: Reminder.Style = function ()
{
    return {
        Root: TodoList__Reminder__Root,
        Icon: TodoList__Reminder__Icon,
        NameTagAndDeadlineContainer: TodoList__Reminder__NameTagAndDeadlineContainer,
        NameInputField: TodoList__Reminder__NameInputField,
        NameText: TodoList__Reminder__NameText,
        DueDateIcon: TodoList__Reminder__DueDateIcon,
        DueDate: TodoList__Reminder__DueDate,
        DueDurationIcon: TodoList__Reminder__DueDurationIcon,
        DueDuration: TodoList__Reminder__DueDuration,
        TagSelector: TodoList__Reminder__TagSelector,
        TagContainer: TodoList__Reminder__TagContainer,
        Tag: TodoList__Reminder__Tag,
        ProgressStripes: TodoList__Reminder__ProgressStripes
    };
};

export const Default: TodoListStyle = function ()
{
    return {
        DataList: TodoList__DataList,
        Reminder: TodoList__Reminder
    };
};
