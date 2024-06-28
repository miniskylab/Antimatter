import {Color} from "@miniskylab/antimatter-color-scheme";
import {Ts} from "@miniskylab/antimatter-framework";
import {type IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {type TextStyle, TextVariant} from "@miniskylab/antimatter-text";
import {type ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {SimpleForecastData, SimpleWeatherData} from "../components";
import {WeatherWidgetContextHook} from "../hooks";
import {type WeatherWidgetStyle} from "../models";

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
        marginRight: 5,
        fontSize: 14
    };
};

const WeatherWidget__StatusValue: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        color: Color.Gray,
        fontSize: 14
    };
};

const WeatherWidget__WeatherConditionContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 0,
        flexBasis: 110,
        height: 125,
        paddingTop: 5,
        marginLeft: 15
    };
};

const WeatherWidget__WeatherConditionIcon: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        color: Color.Neutral,
        fontSize: 50
    };
};

const WeatherWidget__WeatherConditionLabel: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        alignSelf: "stretch",
        lineHeight: 21,
        marginTop: 6,
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

const WeatherWidget__FeelsLikeContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        flexBasis: "100%",
        paddingBottom: 6
    };
};

const WeatherWidget__FeelsLikeLabel: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        marginRight: 6,
        color: Color.Neutral,
        fontSize: 20,
        fontWeight: "bold"
    };
};

const WeatherWidget__FeelsLikeValue: TextStyle = function (textProps)
{
    const weatherWidgetContext = WeatherWidgetContextHook.useWeatherWidgetContext();

    return {
        ...TextVariant.Default(textProps),
        fontSize: 23,
        fontWeight: "bold",
        color: weatherWidgetContext.props.temperatureData?.highlightColor === SimpleWeatherData.HighlightColor.Purple
            ? Color.Purple
            : weatherWidgetContext.props.temperatureData?.highlightColor === SimpleWeatherData.HighlightColor.Tomato
                ? Color.Tomato
                : weatherWidgetContext.props.temperatureData?.highlightColor === SimpleWeatherData.HighlightColor.Blue
                    ? Color.Blue
                    : Color.Neutral
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

const WeatherWidget__TemperatureRangeValue: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
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
        paddingHorizontal: 6,
        borderTopWidth: 0,
        borderBottomWidth: 0
    };
};

const WeatherWidget__TemperatureRangeLabel: TextStyle = function (textProps)
{
    const positionContext = WeatherWidgetContextHook.usePositionContext();
    const weatherWidgetContext = WeatherWidgetContextHook.useWeatherWidgetContext();

    const minTemperatureValueStringLength = weatherWidgetContext.props.temperatureData?.minTemperatureValue.length ?? 0;

    return {
        ...TextVariant.Default(textProps),
        fontSize: 11,
        fontStyle: "italic",
        color: Color.Gray,
        ...positionContext === "middle" && minTemperatureValueStringLength < 4 && {paddingRight: 10}
    };
};

const WeatherWidget__ShortWeatherDataContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        paddingTop: 14
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

const WeatherWidget__UvIndexDescription: TextStyle = function (textProps)
{
    const weatherWidgetContext = WeatherWidgetContextHook.useWeatherWidgetContext();

    return {
        ...TextVariant.Default(textProps),
        fontSize: 13,
        fontWeight: "bold",
        color: weatherWidgetContext.props.uvIndexData?.highlightColor === SimpleWeatherData.HighlightColor.Purple
            ? Color.Purple
            : weatherWidgetContext.props.uvIndexData?.highlightColor === SimpleWeatherData.HighlightColor.Tomato
                ? Color.Tomato
                : weatherWidgetContext.props.uvIndexData?.highlightColor === SimpleWeatherData.HighlightColor.Blue
                    ? Color.Blue
                    : Color.Neutral
    };
};

const WeatherWidget__WindIcon: IconStyle = function (iconProps)
{
    const weatherWidgetContext = WeatherWidgetContextHook.useWeatherWidgetContext();

    const degIconRotation = 180 + (weatherWidgetContext.props.windData?.direction ?? NaN);
    const isPointingDownward = 140 < degIconRotation && degIconRotation < 220;
    const verticalOffsetStrength = isPointingDownward ? 1 : 2;
    const pxVerticalOffsetDistance = verticalOffsetStrength * Math.abs(Math.sin(2 * Ts.Number.degreesToRadians(degIconRotation)));

    return {
        ...IconVariant.Default(iconProps),
        marginRight: 7,
        marginTop: isPointingDownward ? -1 : 0,
        fontSize: 14,
        color: Color.Neutral,
        ...weatherWidgetContext.props.windData && {
            transform: [
                {rotate: `${degIconRotation}deg`},
                {translateY: -pxVerticalOffsetDistance}
            ]
        }
    };
};

const WeatherWidget__WindSpeed: TextStyle = function (textProps)
{
    const weatherWidgetContext = WeatherWidgetContextHook.useWeatherWidgetContext();

    return {
        ...TextVariant.Default(textProps),
        fontSize: 13,
        fontWeight: "bold",
        color: weatherWidgetContext.props.windData?.highlightColor === SimpleWeatherData.HighlightColor.Purple
            ? Color.Purple
            : weatherWidgetContext.props.windData?.highlightColor === SimpleWeatherData.HighlightColor.Tomato
                ? Color.Tomato
                : weatherWidgetContext.props.windData?.highlightColor === SimpleWeatherData.HighlightColor.Blue
                    ? Color.Blue
                    : Color.Neutral
    };
};

const WeatherWidget__SimpleWeatherData__Root: ViewStyle = function (viewProps)
{
    const positionContext = WeatherWidgetContextHook.usePositionContext();

    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        flexBasis: "33.333333%",
        height: 64,
        borderTopWidth: 1,
        borderTopColor: Color.Background,
        ...positionContext === "left" && {
            justifyContent: "flex-start",
            paddingLeft: 15
        },
        ...positionContext === "right" && {
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

const WeatherWidget__SimpleWeatherData__MainTitle: TextStyle = function (textProps)
{
    const simpleWeatherDataContext = SimpleWeatherData.ContextHook.useSimpleWeatherDataContext();

    return {
        ...TextVariant.Default(textProps),
        fontSize: 16,
        fontWeight: "bold",
        color: simpleWeatherDataContext.props.highlightColor === SimpleWeatherData.HighlightColor.Purple
            ? Color.Purple
            : simpleWeatherDataContext.props.highlightColor === SimpleWeatherData.HighlightColor.Tomato
                ? Color.Tomato
                : simpleWeatherDataContext.props.highlightColor === SimpleWeatherData.HighlightColor.Blue
                    ? Color.Blue
                    : Color.Neutral
    };
};

const WeatherWidget__SimpleWeatherData__SubTitle: TextStyle = function (textProps)
{
    const simpleWeatherDataContext = SimpleWeatherData.ContextHook.useSimpleWeatherDataContext();

    return {
        ...TextVariant.Default(textProps),
        fontSize: 12,
        fontStyle: "italic",
        color: simpleWeatherDataContext.props.highlightColor === SimpleWeatherData.HighlightColor.Purple
            ? Color.Purple
            : simpleWeatherDataContext.props.highlightColor === SimpleWeatherData.HighlightColor.Tomato
                ? Color.Tomato
                : simpleWeatherDataContext.props.highlightColor === SimpleWeatherData.HighlightColor.Blue
                    ? Color.Blue
                    : Color.Neutral
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

const WeatherWidget__SimpleForecastDataContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 1,
        alignItems: "stretch",
        paddingTop: 7,
        paddingBottom: 6,
        paddingHorizontal: 15,
        borderTopWidth: 1,
        borderTopColor: Color.Background
    };
};

const WeatherWidget__SimpleForecastData__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        justifyContent: "space-between",
        columnGap: 16,
        height: 36
    };
};

const WeatherWidget__SimpleForecastData__TimeFrame: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        flex: 1,
        color: Color.Neutral,
        fontWeight: "bold"
    };
};

const WeatherWidget__SimpleForecastData__TemperatureForecastDataContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        justifyContent: "flex-start",
        columnGap: 8,
        width: 89
    };
};

const WeatherWidget__SimpleForecastData__TemperatureForecastDataIcon: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        color: Color.Neutral,
        fontSize: 21
    };
};

const WeatherWidget__SimpleForecastData__TemperatureForecastDataValue: TextStyle = function (textProps)
{
    const simpleForecastDataContext = SimpleForecastData.ContextHook.useSimpleForecastDataContext();

    const temperatureRangeForecastData = simpleForecastDataContext.props.temperatureRangeForecastData;

    return {
        ...TextVariant.Default(textProps),
        fontWeight: "bold",
        color: temperatureRangeForecastData.highlightColor === SimpleForecastData.HighlightColor.Purple
            ? Color.Purple
            : temperatureRangeForecastData.highlightColor === SimpleForecastData.HighlightColor.Tomato
                ? Color.Tomato
                : temperatureRangeForecastData.highlightColor === SimpleForecastData.HighlightColor.Blue
                    ? Color.Blue
                    : Color.Neutral
    };
};

const WeatherWidget__SimpleForecastData__HumidityForecastDataContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        justifyContent: "flex-start",
        columnGap: 6,
        width: 57
    };
};

const WeatherWidget__SimpleForecastData__HumidityForecastDataIcon: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        color: Color.Neutral,
        fontSize: 16
    };
};

const WeatherWidget__SimpleForecastData__HumidityForecastDataValue: TextStyle = function (textProps)
{
    const simpleForecastDataContext = SimpleForecastData.ContextHook.useSimpleForecastDataContext();

    const humidityForecastData = simpleForecastDataContext.props.humidityForecastData;

    return {
        ...TextVariant.Default(textProps),
        fontWeight: "bold",
        color: humidityForecastData.highlightColor === SimpleForecastData.HighlightColor.Purple
            ? Color.Purple
            : humidityForecastData.highlightColor === SimpleForecastData.HighlightColor.Tomato
                ? Color.Tomato
                : humidityForecastData.highlightColor === SimpleForecastData.HighlightColor.Blue
                    ? Color.Blue
                    : Color.Neutral
    };
};

const WeatherWidget__SimpleForecastData__PrecipitationProbabilityForecastDataContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        justifyContent: "flex-start",
        columnGap: 6,
        width: 57
    };
};

const WeatherWidget__SimpleForecastData__PrecipitationProbabilityForecastDataIcon: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        color: Color.Neutral,
        fontSize: 16
    };
};

const WeatherWidget__SimpleForecastData__PrecipitationProbabilityForecastDataValue: TextStyle = function (textProps)
{
    const simpleForecastDataContext = SimpleForecastData.ContextHook.useSimpleForecastDataContext();

    const precipitationProbabilityForecastData = simpleForecastDataContext.props.precipitationProbabilityForecastData;

    return {
        ...TextVariant.Default(textProps),
        fontWeight: "bold",
        color: precipitationProbabilityForecastData.highlightColor === SimpleForecastData.HighlightColor.Purple
            ? Color.Purple
            : precipitationProbabilityForecastData.highlightColor === SimpleForecastData.HighlightColor.Tomato
                ? Color.Tomato
                : precipitationProbabilityForecastData.highlightColor === SimpleForecastData.HighlightColor.Blue
                    ? Color.Blue
                    : Color.Neutral
    };
};

const WeatherWidget__SimpleForecastData__AirQualityIndexForecastDataContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        justifyContent: "flex-start",
        columnGap: 6,
        width: 48
    };
};

const WeatherWidget__SimpleForecastData__AirQualityIndexForecastDataIcon: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        color: Color.Neutral,
        fontSize: 17
    };
};

const WeatherWidget__SimpleForecastData__AirQualityIndexForecastDataValue: TextStyle = function (textProps)
{
    const simpleForecastDataContext = SimpleForecastData.ContextHook.useSimpleForecastDataContext();

    const airQualityIndexForecastData = simpleForecastDataContext.props.airQualityIndexForecastData;

    return {
        ...TextVariant.Default(textProps),
        fontWeight: "bold",
        color: airQualityIndexForecastData.highlightColor === SimpleForecastData.HighlightColor.Purple
            ? Color.Purple
            : airQualityIndexForecastData.highlightColor === SimpleForecastData.HighlightColor.Tomato
                ? Color.Tomato
                : airQualityIndexForecastData.highlightColor === SimpleForecastData.HighlightColor.Blue
                    ? Color.Blue
                    : Color.Neutral
    };
};

const WeatherWidget__SimpleForecastData: SimpleForecastData.Style = function ()
{
    return {
        Root: WeatherWidget__SimpleForecastData__Root,
        TimeFrame: WeatherWidget__SimpleForecastData__TimeFrame,
        TemperatureForecastDataContainer: WeatherWidget__SimpleForecastData__TemperatureForecastDataContainer,
        TemperatureForecastDataIcon: WeatherWidget__SimpleForecastData__TemperatureForecastDataIcon,
        TemperatureForecastDataValue: WeatherWidget__SimpleForecastData__TemperatureForecastDataValue,
        HumidityForecastDataContainer: WeatherWidget__SimpleForecastData__HumidityForecastDataContainer,
        HumidityForecastDataIcon: WeatherWidget__SimpleForecastData__HumidityForecastDataIcon,
        HumidityForecastDataValue: WeatherWidget__SimpleForecastData__HumidityForecastDataValue,
        PrecipitationProbabilityForecastDataContainer: WeatherWidget__SimpleForecastData__PrecipitationProbabilityForecastDataContainer,
        PrecipitationProbabilityForecastDataIcon: WeatherWidget__SimpleForecastData__PrecipitationProbabilityForecastDataIcon,
        PrecipitationProbabilityForecastDataValue: WeatherWidget__SimpleForecastData__PrecipitationProbabilityForecastDataValue,
        AirQualityIndexForecastDataContainer: WeatherWidget__SimpleForecastData__AirQualityIndexForecastDataContainer,
        AirQualityIndexForecastDataIcon: WeatherWidget__SimpleForecastData__AirQualityIndexForecastDataIcon,
        AirQualityIndexForecastDataValue: WeatherWidget__SimpleForecastData__AirQualityIndexForecastDataValue
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
        WeatherConditionContainer: WeatherWidget__WeatherConditionContainer,
        WeatherConditionIcon: WeatherWidget__WeatherConditionIcon,
        WeatherConditionLabel: WeatherWidget__WeatherConditionLabel,
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
        SimpleWeatherData: WeatherWidget__SimpleWeatherData,
        SimpleForecastDataContainer: WeatherWidget__SimpleForecastDataContainer,
        SimpleForecastData: WeatherWidget__SimpleForecastData
    };
};
