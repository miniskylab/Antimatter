import {Preview} from "@storybook/react";
import React from "react";
import "./styles.css";
import {theme} from "./theme";

export default {
    decorators: [
        (story) => (
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    columnGap: "25px",
                    rowGap: "25px",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                {story()}
            </div>
        )
    ],

    parameters: {
        layout: "padded",
        docs: {
            theme: theme.dark
        }
    }
} satisfies Preview;
