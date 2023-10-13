import {Preview} from "@storybook/react";
import React from "react";
import {Badge} from "../badge";
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
        },
        status: {
            statuses: {
                [Badge.Draft]: {
                    background: "#5E6670",
                    color: "#FFFFFF",
                    description: "This component is still a work in progress"
                },
                [Badge.Deprecated]: {
                    background: "#FF6347",
                    color: "#FFFFFF",
                    description: "This component should not be used any more"
                },
                [Badge.IOS]: {
                    background: "#FFFFFF",
                    color: "#000000",
                    description: "This component has been tested on iOS"
                },
                [Badge.Android]: {
                    background: "#A4C936",
                    color: "#000000",
                    description: "This component has been tested on Android"
                },
                [Badge.Web]: {
                    background: "#00A0FF",
                    color: "#000000",
                    description: "This component has been tested on Web"
                }
            }
        }
    }
} satisfies Preview;
