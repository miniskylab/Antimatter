import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {LabelStyle, LabelVariant} from "@miniskylab/antimatter-label";
import {ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {SimpleWeatherData} from "../components";
import {WeatherWidgetContextHook} from "../hooks";
import {WeatherWidgetStyle} from "../models";

const WeatherWidget__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        flexWrap: "wrap",
        minWidth: 400,
        maxWidth: 400,
        backgroundColor: Color.Ambient,
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 20,
        shadowColor: Color.Black,
        shadowOpacity: 1
    };
};

const WeatherWidget__StatusBar: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        flexBasis: "100%",
        justifyContent: "space-between",
        height: 25,
        paddingHorizontal: 15,
        backgroundColor: Color.Mineshaft
    };
};

const WeatherWidget__StatusContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        alignSelf: "stretch"
    };
};

const WeatherWidget__StatusIcon: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        color: Color.Gray,
        marginTop: 1,
        marginRight: 6,
        fontSize: 14
    };
};

const WeatherWidget__StatusValue: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        color: Color.Gray,
        fontSize: 14
    };
};

const WeatherWidget__WeatherDescriptionContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 0,
        flexBasis: 110,
        height: 125,
        paddingTop: 4,
        marginLeft: 15
    };
};

const WeatherWidget__WeatherDescriptionIcon: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        color: Color.Neutral,
        fontSize: 50
    };
};

const WeatherWidget__WeatherDescriptionLabel: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        marginTop: 8,
        color: Color.Neutral,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center"
    };
};

const WeatherWidget__MainContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexGrow: 1,
        flexBasis: "50%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        paddingLeft: 20,
        paddingRight: 15
    };
};

const WeatherWidget__TemperatureRangeValueContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexGrow: 1,
        flexDirection: "row",
        flexBasis: "100%",
        justifyContent: "space-between",
        marginHorizontal: -5
    };
};

const WeatherWidget__TemperatureRangeValue: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        paddingHorizontal: 5,
        fontSize: 18,
        fontWeight: "bold",
        color: Color.Neutral,
        backgroundColor: Color.Ambient
    };
};

const WeatherWidget__TemperatureRangeHr: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        position: "absolute",
        width: "100%",
        height: 2,
        backgroundColor: Color.Background
    };
};

const WeatherWidget__TemperatureRangeLabelContainer: ViewStyle = function (viewProps)
{
    return {
        ...WeatherWidget__TemperatureRangeValueContainer(viewProps),
        height: "auto",
        paddingHorizontal: 16,
        borderTopWidth: 0,
        borderBottomWidth: 0
    };
};

const WeatherWidget__TemperatureRangeLabel: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        fontSize: 11,
        fontStyle: "italic",
        color: Color.Gray
    };
};

const WeatherWidget__FeelsLikeContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        flexBasis: "100%",
        paddingBottom: 2
    };
};

const WeatherWidget__FeelsLikeLabel: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        marginRight: 6,
        color: Color.Neutral,
        fontSize: 20,
        fontWeight: "bold"
    };
};

const WeatherWidget__FeelsLikeValue: LabelStyle = function (labelProps)
{
    const weatherWidgetContext = WeatherWidgetContextHook.useWeatherWidgetContext();

    return {
        ...LabelVariant.Default(labelProps),
        fontSize: 23,
        fontWeight: "bold",
        color: weatherWidgetContext.props.temperatureData.isHighlighted ? Color.Tomato : Color.Neutral
    };
};

const WeatherWidget__ShortWeatherDataContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        paddingTop: 15
    };
};

const WeatherWidget__UvIndexIcon: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        marginRight: 6,
        color: Color.Neutral,
        fontSize: 14
    };
};

const WeatherWidget__UvIndexDescription: LabelStyle = function (labelProps)
{
    const weatherWidgetContext = WeatherWidgetContextHook.useWeatherWidgetContext();

    return {
        ...LabelVariant.Default(labelProps),
        fontSize: 13,
        fontWeight: "bold",
        color: weatherWidgetContext.props.uvIndexData.isHighlighted ? Color.Tomato : Color.Neutral
    };
};

const WeatherWidget__WindIcon: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        marginRight: 6,
        color: Color.Neutral,
        fontSize: 14
    };
};

const WeatherWidget__WindSpeed: LabelStyle = function (labelProps)
{
    const weatherWidgetContext = WeatherWidgetContextHook.useWeatherWidgetContext();

    return {
        ...LabelVariant.Default(labelProps),
        fontSize: 13,
        fontWeight: "bold",
        color: weatherWidgetContext.props.windData.isHighlighted ? Color.Tomato : Color.Neutral
    };
};

const WeatherWidget__SimpleWeatherData__Root: ViewStyle = function (viewProps)
{
    const simpleWeatherDataPositionContext = WeatherWidgetContextHook.useSimpleWeatherDataPositionContext();

    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        flexBasis: "33.333333%",
        height: 64,
        borderTopWidth: 1,
        borderTopColor: Color.Background,
        ...simpleWeatherDataPositionContext === "left" && {
            justifyContent: "flex-start",
            paddingLeft: 15
        },
        ...simpleWeatherDataPositionContext === "right" && {
            justifyContent: "flex-end",
            paddingRight: 15
        }
    };
};

const WeatherWidget__SimpleWeatherData__Icon: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        fontSize: 28,
        color: Color.Neutral
    };
};

const WeatherWidget__SimpleWeatherData__TitleContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        alignItems: "flex-start",
        marginLeft: 5
    };
};

const WeatherWidget__SimpleWeatherData__MainTitle: LabelStyle = function (labelProps)
{
    const simpleWeatherDataContext = SimpleWeatherData.ContextHook.useSimpleWeatherDataContext();

    return {
        ...LabelVariant.Default(labelProps),
        fontSize: 16,
        fontWeight: "bold",
        color: simpleWeatherDataContext.props.isHighlighted ? Color.Tomato : Color.Neutral
    };
};

const WeatherWidget__SimpleWeatherData__SubTitle: LabelStyle = function (labelProps)
{
    const simpleWeatherDataContext = SimpleWeatherData.ContextHook.useSimpleWeatherDataContext();

    return {
        ...LabelVariant.Default(labelProps),
        fontSize: 12,
        fontStyle: "italic",
        color: simpleWeatherDataContext.props.isHighlighted ? Color.Tomato : Color.Neutral
    };
};

const WeatherWidget__SimpleWeatherData: SimpleWeatherData.Style = function ()
{
    return {
        Root: WeatherWidget__SimpleWeatherData__Root,
        Icon: WeatherWidget__SimpleWeatherData__Icon,
        TitleContainer: WeatherWidget__SimpleWeatherData__TitleContainer,
        MainTitle: WeatherWidget__SimpleWeatherData__MainTitle,
        Subtitle: WeatherWidget__SimpleWeatherData__SubTitle
    };
};

export const Default: WeatherWidgetStyle = function ()
{
    return {
        Root: WeatherWidget__Root,
        StatusBar: WeatherWidget__StatusBar,
        StatusContainer: WeatherWidget__StatusContainer,
        StatusIcon: WeatherWidget__StatusIcon,
        StatusValue: WeatherWidget__StatusValue,
        WeatherDescriptionContainer: WeatherWidget__WeatherDescriptionContainer,
        WeatherDescriptionIcon: WeatherWidget__WeatherDescriptionIcon,
        WeatherDescriptionLabel: WeatherWidget__WeatherDescriptionLabel,
        MainContainer: WeatherWidget__MainContainer,
        TemperatureRangeValueContainer: WeatherWidget__TemperatureRangeValueContainer,
        TemperatureRangeValue: WeatherWidget__TemperatureRangeValue,
        TemperatureRangeHr: WeatherWidget__TemperatureRangeHr,
        TemperatureRangeLabelContainer: WeatherWidget__TemperatureRangeLabelContainer,
        TemperatureRangeLabel: WeatherWidget__TemperatureRangeLabel,
        FeelsLikeContainer: WeatherWidget__FeelsLikeContainer,
        FeelsLikeLabel: WeatherWidget__FeelsLikeLabel,
        FeelsLikeValue: WeatherWidget__FeelsLikeValue,
        ShortWeatherDataContainer: WeatherWidget__ShortWeatherDataContainer,
        UvIndexIcon: WeatherWidget__UvIndexIcon,
        UvIndexDescription: WeatherWidget__UvIndexDescription,
        WindIcon: WeatherWidget__WindIcon,
        WindSpeed: WeatherWidget__WindSpeed,
        SimpleWeatherData: WeatherWidget__SimpleWeatherData
    };
};
