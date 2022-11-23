import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconVariant} from "@miniskylab/antimatter-icon";
import {LabelVariant} from "@miniskylab/antimatter-label";
import {InputFieldStyles} from "../model";

export const Default: InputFieldStyles = {};

Default.Root = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 40,
    backgroundColor: Color.Mineshaft
};

Default.AddOn = {
    ...IconVariant.Default,
    Root: {
        ...IconVariant.Default.Root,
        width: 40,
        height: "100%",
        fontSize: 20,
        color: Color.Mineshaft,
        backgroundColor: Color.Gray
    }
};

Default.Container = {
    flexGrow: 1,
    position: "relative"
};

Default.Placeholder = {
    ...LabelVariant.Default,
    Root: {
        ...LabelVariant.Default.Root,
        position: "absolute",
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
        paddingLeft: 12,
        color: Color.Gray,
        fontSize: 16
    }
};

Default.Placeholder__Shrunk = {
    ...Default.Placeholder,
    Root: {
        ...Default.Placeholder.Root,
        fontSize: 11,
        height: "55%"
    }
};

Default.TextBox = {
    width: "100%",
    height: "100%",
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 14,
    color: Color.Neutral,
    backgroundColor: Color.Transparent
};

Default.TextBox__Shrunk = {
    ...Default.TextBox,
    paddingTop: 20,
    paddingBottom: 5
};
