import {Color} from "@miniskylab/antimatter-color-scheme";
import {Layer} from "@miniskylab/antimatter-framework";
import {TextStyle, ViewStyle} from "react-native";

export const Root: ViewStyle = {
    alignItems: "center",
    justifyContent: "center"
};

export const BadgeContainer: ViewStyle = {
    flexDirection: "row",
    height: 28,
    marginTop: 5,
    marginBottom: 18,
    backgroundColor: Color.Mineshaft
};

export const BadgeDescription: TextStyle = {
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 10,
    marginRight: -2,
    fontSize: 14,
    fontWeight: "bold",
    color: Color.Neutral,
    backgroundColor: Color.Background,
    zIndex: Layer.Higher
};

const BadgeValue: TextStyle = {
    paddingHorizontal: 12,
    marginVertical: 5,
    borderLeftWidth: 2,
    fontSize: 14,
    fontWeight: "bold"
};

export const BadgeValueIOS: TextStyle = {
    ...BadgeValue,
    color: Color.White
};

export const BadgeValueAndroid: TextStyle = {
    ...BadgeValue,
    color: Color.Green
};

export const BadgeValueWeb: TextStyle = {
    ...BadgeValue,
    color: Color.Blue
};
