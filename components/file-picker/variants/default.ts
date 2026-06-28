import {ButtonContextHook, type ButtonStyle, ButtonVariant} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {DataListAnimationHook} from "@miniskylab/antimatter-data-list";
import {Layer} from "@miniskylab/antimatter-framework";
import {type IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {ProgressStripesContextHook, type ProgressStripesStyle, ProgressStripesVariant} from "@miniskylab/antimatter-motion-graphics";
import {PressableContextHook, type PressableStyle} from "@miniskylab/antimatter-pressable";
import {type ScrollViewStyle, ScrollViewVariant} from "@miniskylab/antimatter-scroll-view";
import {type TextStyle, TextVariant} from "@miniskylab/antimatter-text";
import {type ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {FileRow} from "../components";
import {type FilePickerStyle} from "../models";

const FilePicker__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 1,
        alignItems: "stretch",
        minWidth: 300,
        maxWidth: 450
    };
};

const FilePicker__Description: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        marginBottom: 5,
        color: Color.Neutral,
        fontSize: 16
    };
};

const FilePicker__ControlPanel: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        height: 60,
        paddingLeft: 18,
        backgroundColor: Color.Background
    };
};

const FilePicker__FileSelectionButton__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        alignSelf: "flex-start",
        flexDirection: "column",
        minWidth: undefined,
        height: "100%",
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 5,
        paddingBottom: 4,
        borderWidth: 0,
        backgroundColor: Color.Transparent
    };
};

const FilePicker__FileSelectionButton__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        flexGrow: 1,
        fontSize: 28,
        color: pressableContext.state.pressed
            ? Color.Gray
            : pressableContext.state.hovered
                ? Color.White
                : Color.Neutral
    };
};

const FilePicker__FileSelectionButton__Label: TextStyle = function (textProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Label(textProps);

    return {
        ...inheritedStyle,
        lineHeight: 15,
        marginTop: 3,
        paddingVertical: 0,
        paddingHorizontal: 0,
        fontSize: 12,
        fontWeight: "bold",
        color: pressableContext.state.pressed
            ? Color.Gray
            : pressableContext.state.hovered
                ? Color.White
                : Color.Neutral
    };
};

const FilePicker__FileSelectionButton: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedRectangular(buttonProps),
        Root: FilePicker__FileSelectionButton__Root,
        Icon: FilePicker__FileSelectionButton__Icon,
        Label: FilePicker__FileSelectionButton__Label
    };
};

const FilePicker__FileList: ScrollViewStyle = function (scrollViewProps)
{
    return {
        ...ScrollViewVariant.Default(scrollViewProps),
        maxHeight: 300,
        borderWidth: 1,
        borderTopWidth: 0,
        borderStyle: "solid",
        borderColor: Color.Background
    };
};

const FilePicker__FileRow__Root: ViewStyle = function (viewProps)
{
    const fileRowContext = FileRow.ContextHook.useFileRowContext();

    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "stretch",
        height: 61,
        paddingLeft: 15,
        paddingRight: 16,
        marginTop: -1,
        borderTopWidth: 1,
        borderStyle: "solid",
        borderColor: Color.Background,
        animations: () =>
        {
            return [() => DataListAnimationHook.useFlashHighlightAnimation(Color.Background, Color.Green)];
        },
        animationOverride: {
            ...fileRowContext.props.status === FileRow.Status.Processing && {backgroundColor: Color.Blue__a10}
        }
    };
};

const FilePicker__FileRow__Icon: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        fontSize: 40,
        color: Color.Neutral
    };
};

const FilePicker__FileRow__TitleContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 1,
        alignItems: "flex-start",
        rowGap: 5,
        paddingLeft: 6,
        paddingRight: 12
    };
};

const FilePicker__FileRow__MainTitle: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        maxWidth: "100%",
        color: Color.Neutral,
        fontWeight: "bold",
        fontSize: 17
    };
};

const FilePicker__FileRow__Subtitle: TextStyle = function (textProps)
{
    const fileRowContext = FileRow.ContextHook.useFileRowContext();

    return {
        ...TextVariant.Default(textProps),
        maxWidth: "100%",
        paddingBottom: 1,
        fontSize: 13,
        color: fileRowContext.props.status === FileRow.Status.Faulted
            ? Color.Red
            : fileRowContext.props.status === FileRow.Status.RanToCompletion
                ? Color.Green
                : fileRowContext.props.status === FileRow.Status.Processing
                    ? Color.Blue
                    : Color.Neutral
    };
};

const FilePicker__FileRow__ControlContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        columnGap: 20,
        marginLeft: "auto"
    };
};

const FilePicker__FileRow__DeleteButton__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.OutlinedCircular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        width: "auto",
        height: "auto",
        border: "none",
        backgroundColor: "none"
    };
};

const FilePicker__FileRow__DeleteButton__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const inheritedStyle = ButtonVariant.OutlinedCircular(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        fontSize: 14,
        color: pressableContext.state.pressed
            ? Color.Gray
            : pressableContext.state.hovered
                ? Color.White
                : Color.Neutral
    };
};

const FilePicker__FileRow__DeleteButton: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedCircular(buttonProps),
        Root: FilePicker__FileRow__DeleteButton__Root,
        Icon: FilePicker__FileRow__DeleteButton__Icon
    };
};

const FilePicker__FileRow__ProgressStripes__Root: ViewStyle = function (viewProps)
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

const FilePicker__FileRow__ProgressStripes__Stripe: ViewStyle = function (viewProps)
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

const FilePicker__FileRow__ProgressStripes: ProgressStripesStyle = function (progressStripesProps)
{
    return {
        ...ProgressStripesVariant.Default(progressStripesProps),
        Root: FilePicker__FileRow__ProgressStripes__Root,
        Stripe: FilePicker__FileRow__ProgressStripes__Stripe
    };
};

const FilePicker__FileRow: FileRow.Style = function ()
{
    return {
        Root: FilePicker__FileRow__Root,
        Icon: FilePicker__FileRow__Icon,
        TitleContainer: FilePicker__FileRow__TitleContainer,
        MainTitle: FilePicker__FileRow__MainTitle,
        Subtitle: FilePicker__FileRow__Subtitle,
        ControlContainer: FilePicker__FileRow__ControlContainer,
        DeleteButton: FilePicker__FileRow__DeleteButton,
        ProgressStripes: FilePicker__FileRow__ProgressStripes
    };
};

const FilePicker__Footnote: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        marginTop: 5,
        color: Color.Neutral,
        fontStyle: "italic",
        fontSize: 14
    };
};

export const Default: FilePickerStyle = function ()
{
    return {
        Root: FilePicker__Root,
        Description: FilePicker__Description,
        ControlPanel: FilePicker__ControlPanel,
        FileList: FilePicker__FileList,
        FileRow: FilePicker__FileRow,
        FileSelectionButton: FilePicker__FileSelectionButton,
        Footnote: FilePicker__Footnote
    };
};
