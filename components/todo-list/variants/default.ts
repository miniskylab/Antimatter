import {ButtonContextHook, type ButtonStyle, ButtonVariant} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {DataListAnimationHook, DataListContextHook, type DataListStyle, DataListVariant} from "@miniskylab/antimatter-data-list";
import {DropdownMenuContextHook, type DropdownMenuStyle, DropdownMenuVariant, MenuItemStatus} from "@miniskylab/antimatter-dropdown-menu";
import {CursorType, isNotNullAndUndefined, Layer} from "@miniskylab/antimatter-framework";
import {type IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {InputFieldContextHook, type InputFieldStyle, InputFieldVariant} from "@miniskylab/antimatter-input-field";
import {ProgressStripesContextHook, type ProgressStripesStyle, ProgressStripesVariant} from "@miniskylab/antimatter-motion-graphics";
import {
    NumericInputFieldContextHook,
    type NumericInputFieldStyle,
    NumericInputFieldVariant
} from "@miniskylab/antimatter-numeric-input-field";
import {PressableContextHook, type PressableStyle, PressableVariant} from "@miniskylab/antimatter-pressable";
import {type ScrollViewStyle} from "@miniskylab/antimatter-scroll-view";
import {type TextStyle, TextVariant} from "@miniskylab/antimatter-text";
import {type TextInputStyle} from "@miniskylab/antimatter-text-input";
import {Status, ToggleContextHook, type ToggleStyle, ToggleVariant} from "@miniskylab/antimatter-toggle";
import {type ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {Reminder} from "../components";
import {TodoListContextHook} from "../hooks";
import {type TodoListStyle} from "../models";

const TodoList__DataList__Button1__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const dataListContext = DataListContextHook.useDataListContext();
    const todoListContext = TodoListContextHook.useTodoListContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const isDraftMode = todoListContext.props.mode === Reminder.Mode.Draft;
    const isEditMode = todoListContext.props.mode === Reminder.Mode.Edit;
    const isDeleteMode = todoListContext.props.mode === Reminder.Mode.Delete;

    const inheritedStyle = DataListVariant.Default(dataListContext.props)
        .Button1(buttonContext.props)
        .Icon(iconProps);

    return {
        ...inheritedStyle,
        color: pressableContext.state.pressed
            ? Color.Gray
            : pressableContext.state.hovered
                ? Color.White
                : isDraftMode || isEditMode
                    ? Color.Primary
                    : isDeleteMode
                        ? Color.Tomato
                        : Color.Neutral
    };
};

const TodoList__DataList__Button1__Label: TextStyle = function (textProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const dataListContext = DataListContextHook.useDataListContext();
    const todoListContext = TodoListContextHook.useTodoListContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const isDraftMode = todoListContext.props.mode === Reminder.Mode.Draft;
    const isEditMode = todoListContext.props.mode === Reminder.Mode.Edit;
    const isDeleteMode = todoListContext.props.mode === Reminder.Mode.Delete;

    const inheritedStyle = DataListVariant.Default(dataListContext.props)
        .Button1(buttonContext.props)
        .Label(textProps);

    return {
        ...inheritedStyle,
        color: pressableContext.state.pressed
            ? Color.Gray
            : pressableContext.state.hovered
                ? Color.White
                : isDraftMode || isEditMode
                    ? Color.Primary
                    : isDeleteMode
                        ? Color.Tomato
                        : Color.Neutral
    };
};

const TodoList__DataList__Button1: ButtonStyle = function (buttonProps)
{
    const dataListContext = DataListContextHook.useDataListContext();

    const inheritedStyle = DataListVariant.Default(dataListContext.props)
        .Button1(buttonProps);

    return {
        ...inheritedStyle,
        Icon: TodoList__DataList__Button1__Icon,
        Label: TodoList__DataList__Button1__Label
    };
};

const TodoList__DataList__Button2__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const dataListContext = DataListContextHook.useDataListContext();
    const todoListContext = TodoListContextHook.useTodoListContext();

    const isDraftMode = todoListContext.props.mode === Reminder.Mode.Draft;
    const isReadOnlyMode = todoListContext.props.mode === Reminder.Mode.ReadOnly;

    const inheritedStyle = DataListVariant.Default(dataListContext.props)
        .Button2(buttonContext.props)
        .Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        backgroundColor: isDraftMode
            ? Color.Primary
            : isReadOnlyMode
                ? Color.Neutral
                : Color.Transparent
    };
};

const TodoList__DataList__Button2__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const dataListContext = DataListContextHook.useDataListContext();
    const todoListContext = TodoListContextHook.useTodoListContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const isDraftMode = todoListContext.props.mode === Reminder.Mode.Draft;
    const isEditMode = todoListContext.props.mode === Reminder.Mode.Edit;
    const isDeleteMode = todoListContext.props.mode === Reminder.Mode.Delete;
    const isReadOnlyMode = todoListContext.props.mode === Reminder.Mode.ReadOnly;

    const inheritedStyle = DataListVariant.Default(dataListContext.props)
        .Button2(buttonContext.props)
        .Icon(iconProps);

    return {
        ...inheritedStyle,
        color: pressableContext.state.pressed
            ? Color.Gray
            : pressableContext.state.hovered
                ? Color.White
                : isDraftMode || isReadOnlyMode
                    ? Color.Background
                    : isEditMode
                        ? Color.Primary
                        : isDeleteMode
                            ? Color.Tomato
                            : Color.Neutral
    };
};

const TodoList__DataList__Button2__Label: TextStyle = function (textProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const dataListContext = DataListContextHook.useDataListContext();
    const todoListContext = TodoListContextHook.useTodoListContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const isDraftMode = todoListContext.props.mode === Reminder.Mode.Draft;
    const isEditMode = todoListContext.props.mode === Reminder.Mode.Edit;
    const isDeleteMode = todoListContext.props.mode === Reminder.Mode.Delete;
    const isReadOnlyMode = todoListContext.props.mode === Reminder.Mode.ReadOnly;

    const inheritedStyle = DataListVariant.Default(dataListContext.props)
        .Button2(buttonContext.props)
        .Label(textProps);

    return {
        ...inheritedStyle,
        color: pressableContext.state.pressed
            ? Color.Gray
            : pressableContext.state.hovered
                ? Color.White
                : isDraftMode || isReadOnlyMode
                    ? Color.Background
                    : isEditMode
                        ? Color.Primary
                        : isDeleteMode
                            ? Color.Tomato
                            : Color.Neutral
    };
};

const TodoList__DataList__Button2: ButtonStyle = function (buttonProps)
{
    const dataListContext = DataListContextHook.useDataListContext();

    const inheritedStyle = DataListVariant.Default(dataListContext.props)
        .Button2(buttonProps);

    return {
        ...inheritedStyle,
        Root: TodoList__DataList__Button2__Root,
        Icon: TodoList__DataList__Button2__Icon,
        Label: TodoList__DataList__Button2__Label
    };
};

const TodoList__DataList__Button3__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const dataListContext = DataListContextHook.useDataListContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const inheritedStyle = DataListVariant.Default(dataListContext.props)
        .Button3(buttonContext.props)
        .Icon(iconProps);

    return {
        ...inheritedStyle,
        color: pressableContext.state.pressed
            ? Color.Gray
            : pressableContext.state.hovered
                ? Color.White
                : Color.Neutral
    };
};

const TodoList__DataList__Button3__Label: TextStyle = function (textProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const dataListContext = DataListContextHook.useDataListContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const inheritedStyle = DataListVariant.Default(dataListContext.props)
        .Button3(buttonContext.props)
        .Label(textProps);

    return {
        ...inheritedStyle,
        color: pressableContext.state.pressed
            ? Color.Gray
            : pressableContext.state.hovered
                ? Color.White
                : Color.Neutral
    };
};

const TodoList__DataList__Button3: ButtonStyle = function (buttonProps)
{
    const dataListContext = DataListContextHook.useDataListContext();

    const inheritedStyle = DataListVariant.Default(dataListContext.props)
        .Button3(buttonProps);

    return {
        ...inheritedStyle,
        Icon: TodoList__DataList__Button3__Icon,
        Label: TodoList__DataList__Button3__Label
    };
};

const TodoList__DataList: DataListStyle = function (dataListProps)
{
    return {
        ...DataListVariant.Default(dataListProps),
        Button1: TodoList__DataList__Button1,
        Button2: TodoList__DataList__Button2,
        Button3: TodoList__DataList__Button3
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
        flexWrap: "wrap",
        alignItems: "flex-start",
        alignContent: "flex-start",
        justifyContent: "flex-start",
        paddingTop: 8,
        paddingBottom: 12,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderStyle: "solid",
        borderColor: Color.Neutral,
        marginTop: -2,
        cursor: hasSelectedReminder ? CursorType.Default : CursorType.Pointer,
        overflow: "hidden",
        animations: () =>
        {
            const flashHighlightAnimation = DataListAnimationHook.useFlashHighlightAnimation();
            const elasticHeightAnimation = DataListAnimationHook.useElasticHeightAnimation(66, 2, 181, 181);

            return reminderContext.props.toBeDeleted
                ? [() => flashHighlightAnimation, () => elasticHeightAnimation]
                : [() => elasticHeightAnimation, () => flashHighlightAnimation];
        },
        animationOverride: {
            ...((!hasSelectedReminder && pressableState.hovered) || isSelectedReminder) && {
                zIndex: Layer.AlwaysOnTop,
                borderColor: Color.Primary,
                backgroundColor: Color.Primary__a10,
                ...reminderContext.props.mode === Reminder.Mode.Delete && {
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

    const dueDuration = reminderContext.extra.dueDuration;

    return {
        ...IconVariant.Default(iconProps),
        display: reminderContext.props.toBeDeleted ? "none" : "flex",
        width: 30,
        height: 30,
        marginTop: 7,
        fontSize: 28,
        color: reminderContext.extra.isMarkedAsDone
            ? Color.Green
            : dueDuration === 0
                ? Color.Gold
                : isNotNullAndUndefined(dueDuration) && dueDuration < 0
                    ? Color.Coral
                    : Color.Neutral
    };
};

const TodoList__Reminder__NameTagAndDeadlineContainer: ViewStyle = function (viewProps)
{
    const reminderContext = Reminder.ContextHook.useReminderContext();

    return {
        ...ViewVariant.Default(viewProps),
        display: reminderContext.props.toBeDeleted ? "none" : "flex",
        flex: 1,
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
    const reminderContext = Reminder.ContextHook.useReminderContext();
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const isHighlighted = Object.values(reminderContext.props.tags ?? {})
        .some(
            tag => tag.status === Reminder.TagStatus.Selected &&
                   tag.metadata?.has(Reminder.TagMetadata.HighlightTarget)
        );

    const inheritedStyle = InputFieldVariant.Default(inputFieldContext.props).TextBox(textInputProps);

    return {
        ...inheritedStyle,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        fontSize: 18,
        fontWeight: "bold",
        color: isHighlighted ? Color.Coral : Color.Neutral,
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
    const reminderContext = Reminder.ContextHook.useReminderContext();

    const isHighlighted = Object.values(reminderContext.props.tags ?? {})
        .some(
            tag => tag.status === Reminder.TagStatus.Selected &&
                   tag.metadata?.has(Reminder.TagMetadata.HighlightTarget)
        );

    return {
        ...TextVariant.Default(textProps),
        alignItems: "flex-start",
        width: "100%",
        height: 23,
        marginTop: -1,
        fontSize: 18,
        fontWeight: "bold",
        color: isHighlighted ? Color.Coral : Color.Neutral
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
    const reminderContext = Reminder.ContextHook.useReminderContext();

    const dueDuration = reminderContext.extra.dueDuration;
    const isOverdue = isNotNullAndUndefined(dueDuration) && dueDuration < 0;
    const isDue = dueDuration === 0;

    return {
        ...TodoList__Reminder__DueDateIcon(iconProps),
        fontSize: 15,
        transform: [{scaleX: isDue || isOverdue ? 1 : -1}],
        color: isDue
            ? Color.Gold
            : isOverdue
                ? Color.Coral
                : Color.Neutral
    };
};

const TodoList__Reminder__DueDuration: TextStyle = function (textProps)
{
    const reminderContext = Reminder.ContextHook.useReminderContext();

    const dueDuration = reminderContext.extra.dueDuration;

    return {
        ...TodoList__Reminder__DueDate(textProps),
        color: dueDuration === 0
            ? Color.Gold
            : isNotNullAndUndefined(dueDuration) && dueDuration < 0
                ? Color.Coral
                : Color.Neutral
    };
};

const TodoList__Reminder__TagSelector__Root: ViewStyle = function (viewProps)
{
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props).Root(viewProps);

    return {
        ...inheritedStyle,
        flex: 1,
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
        borderColor: isHighlighted ? Color.Coral : Color.Neutral,
        backgroundColor: menuItem?.status === MenuItemStatus.Selected || pressableState.pressed
            ? isHighlighted ? Color.Coral : Color.Neutral
            : pressableState.hovered
                ? isHighlighted ? Color.Coral__a10 : Color.Neutral__a10
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
                    ? Color.Coral
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
        borderColor: isHighlighted ? Color.Coral : Color.Neutral,
        fontSize: 12,
        color: Color.Background,
        backgroundColor: isHighlighted ? Color.Coral : Color.Neutral
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

const TodoList__Reminder__ExpansionArea: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 1,
        flexBasis: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        rowGap: 8,
        columnGap: 8,
        borderTopWidth: 2,
        borderStyle: "dashed",
        borderColor: Color.Gray,
        paddingTop: 12,
        marginTop: 12,
        marginLeft: 35
    };
};

const TodoList__Reminder__RecurrencePatternInputField__Root: ViewStyle = function (viewProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const inheritedStyle = InputFieldVariant.Default(inputFieldContext.props).Root(viewProps);

    return {
        ...inheritedStyle,
        backgroundColor: Color.Ambient
    };
};

const TodoList__Reminder__RecurrencePatternInputField__TextBox: TextInputStyle = function (textInputProps)
{
    const reminderContext = Reminder.ContextHook.useReminderContext();
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const inheritedStyle = InputFieldVariant.Default(inputFieldContext.props).TextBox(textInputProps);

    return {
        ...inheritedStyle,
        paddingRight: 50,
        fontWeight: "bold",
        color: Color.Neutral,
        ...reminderContext.extra.isMarkedAsDone && {
            color: Color.Green,
            cursor: CursorType.NotAllowed
        }
    };
};

const TodoList__Reminder__RecurrencePatternInputField: InputFieldStyle = function (inputFieldProps)
{
    return {
        ...InputFieldVariant.Default(inputFieldProps),
        Root: TodoList__Reminder__RecurrencePatternInputField__Root,
        TextBox: TodoList__Reminder__RecurrencePatternInputField__TextBox
    };
};

const TodoList__Reminder__NotificationIntervalNumericInputField__Root: ViewStyle = function (viewProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();
    const numericInputFieldContext = NumericInputFieldContextHook.useNumericInputFieldContext();

    const inheritedStyle = NumericInputFieldVariant.Default(numericInputFieldContext.props, numericInputFieldContext.state)
        (inputFieldContext.props)
        .Root(viewProps);

    return {
        ...inheritedStyle,
        flex: 1,
        backgroundColor: Color.Ambient
    };
};

const TodoList__Reminder__NotificationIntervalNumericInputField__TextBox: TextInputStyle = function (textInputProps)
{
    const reminderContext = Reminder.ContextHook.useReminderContext();
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();
    const numericInputFieldContext = NumericInputFieldContextHook.useNumericInputFieldContext();

    const inheritedStyle = NumericInputFieldVariant.Default(numericInputFieldContext.props, numericInputFieldContext.state)
        (inputFieldContext.props)
        .TextBox(textInputProps);

    return {
        ...inheritedStyle,
        paddingRight: 50,
        fontWeight: "bold",
        ...reminderContext.extra.isMarkedAsDone && {
            cursor: CursorType.NotAllowed
        }
    };
};

const TodoList__Reminder__NotificationIntervalNumericInputField__Placeholder: TextStyle = function (textProps)
{
    const reminderContext = Reminder.ContextHook.useReminderContext();
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();
    const numericInputFieldContext = NumericInputFieldContextHook.useNumericInputFieldContext();

    const inheritedStyle = NumericInputFieldVariant.Default(numericInputFieldContext.props, numericInputFieldContext.state)
        (inputFieldContext.props)
        .Placeholder(textProps);

    return {
        ...inheritedStyle,
        ...reminderContext.extra.isMarkedAsDone && {
            fontWeight: "bold",
            fontStyle: "italic"
        }
    };
};

const TodoList__Reminder__NotificationIntervalNumericInputField: NumericInputFieldStyle = function (numericInputFieldProps,
    numericInputFieldState)
{
    return inputFieldProps => ({
        ...NumericInputFieldVariant.Default(numericInputFieldProps, numericInputFieldState)(inputFieldProps),
        Root: TodoList__Reminder__NotificationIntervalNumericInputField__Root,
        TextBox: TodoList__Reminder__NotificationIntervalNumericInputField__TextBox,
        Placeholder: TodoList__Reminder__NotificationIntervalNumericInputField__Placeholder
    });
};

const TodoList__Reminder__DoneToggle__Root: ViewStyle = function (viewProps)
{
    const toggleContext = ToggleContextHook.useToggleContext();

    const inheritedStyle = ToggleVariant.Checkbox(toggleContext.props).Root(viewProps);

    return {
        ...inheritedStyle,
        position: "absolute",
        top: 12,
        right: 0
    };
};

const TodoList__Reminder__DoneToggle__Container: PressableStyle = function (pressableProps, pressableState)
{
    const toggleContext = ToggleContextHook.useToggleContext();

    const inheritedStyle = ToggleVariant.Checkbox(toggleContext.props).Container(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        borderWidth: 0,
        width: 40,
        height: 40,
        backgroundColor: Color.Transparent
    };
};

const TodoList__Reminder__DoneToggle__Icon: IconStyle = function (iconProps)
{
    const toggleContext = ToggleContextHook.useToggleContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const inheritedStyle = ToggleVariant.Checkbox(toggleContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        display: "flex",
        fontSize: 24,
        color: toggleContext.props.status === Status.Checked || pressableContext.state.pressed
            ? Color.Green
            : pressableContext.state.hovered
                ? Color.White
                : Color.Neutral
    };
};

const TodoList__Reminder__DoneToggle: ToggleStyle = function (toggleProps)
{
    return {
        ...ToggleVariant.Checkbox(toggleProps),
        Root: TodoList__Reminder__DoneToggle__Root,
        Container: TodoList__Reminder__DoneToggle__Container,
        Icon: TodoList__Reminder__DoneToggle__Icon
    };
};

const TodoList__Reminder__MuteToggle__Root: ViewStyle = function (viewProps)
{
    const toggleContext = ToggleContextHook.useToggleContext();

    return {
        ...TodoList__Reminder__DoneToggle__Root(viewProps),
        display: toggleContext.props.disabled ? "none" : "flex",
        top: 60,
        right: 128
    };
};

const TodoList__Reminder__MuteToggle__Icon: IconStyle = function (iconProps)
{
    const toggleContext = ToggleContextHook.useToggleContext();
    const pressableContext = PressableContextHook.usePressableContext();

    return {
        ...TodoList__Reminder__DoneToggle__Icon(iconProps),
        transform: [{scaleX: -1}],
        color: toggleContext.props.status === Status.Checked || pressableContext.state.pressed
            ? Color.Tomato
            : pressableContext.state.hovered
                ? Color.White
                : Color.Neutral
    };
};

const TodoList__Reminder__MuteToggle: ToggleStyle = function (toggleProps)
{
    return {
        ...TodoList__Reminder__DoneToggle(toggleProps),
        Root: TodoList__Reminder__MuteToggle__Root,
        Icon: TodoList__Reminder__MuteToggle__Icon
    };
};

const TodoList__Reminder__DismissButton__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.SolidRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        height: 40
    };
};

const TodoList__Reminder__DismissButton__Label: TextStyle = function (textProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.SolidRectangular(buttonContext.props).Label(textProps);

    return {
        ...inheritedStyle,
        fontSize: 16,
        fontWeight: "bold"
    };
};

const TodoList__Reminder__DismissButton: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.SolidRectangular(buttonProps),
        Root: TodoList__Reminder__DismissButton__Root,
        Label: TodoList__Reminder__DismissButton__Label
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
        ExpansionArea: TodoList__Reminder__ExpansionArea,
        RecurrencePatternInputField: TodoList__Reminder__RecurrencePatternInputField,
        NotificationIntervalNumericInputField: TodoList__Reminder__NotificationIntervalNumericInputField,
        DoneToggle: TodoList__Reminder__DoneToggle,
        MuteToggle: TodoList__Reminder__MuteToggle,
        DismissButton: TodoList__Reminder__DismissButton,
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
