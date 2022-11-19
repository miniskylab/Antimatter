import {Color} from "@miniskylab/antimatter-color-scheme";
import {LabelVariant} from "@miniskylab/antimatter-label";
import {FooterStyles} from "../model";

export const Default: FooterStyles = {
    Root: {
        ...LabelVariant.Default,
        Root: {
            ...LabelVariant.Default.Root,
            width: "100%",
            minWidth: 300,
            lineHeight: 28,
            padding: 15,
            fontSize: 16,
            fontWeight: "bold",
            color: Color.White,
            backgroundColor: Color.Background,
            textAlign: "center"
        }
    }
};
