import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {NavMenuProps} from "../../models";

export const Categories: NavMenuProps["categories"] = [
    {
        label: "Lorem ipsum",
        menuItems: [
            {
                icon: DefaultIconSet.Home,
                label: "Dolor sit amet",
                url: "/dolor-sit-amet"
            },
            {
                icon: DefaultIconSet.Flag,
                label: "Consectetur",
                url: "/consectetur"
            }
        ]
    },
    {
        label: "Sodales",
        menuItems: [
            {
                icon: DefaultIconSet.PriceTag,
                label: "Imperdiet",
                url: "/imperdiet"
            },
            {
                icon: DefaultIconSet.Location,
                label: "Dignissim",
                url: "/dignissim"
            },
            {
                icon: DefaultIconSet.WiFi,
                label: "Condimentum",
                url: "/condimentum"
            },
            {
                icon: DefaultIconSet.Droplet,
                label: "Pellentesque",
                url: "/pellentesque"
            }
        ]
    },
    {
        label: "Viverra",
        menuItems: [
            {
                icon: DefaultIconSet.Medal,
                label: "Vulputate",
                url: "/vulputate"
            },
            {
                icon: DefaultIconSet.Sun,
                label: "Placerat",
                url: "/placerat"
            },
            {
                icon: DefaultIconSet.Gear,
                label: "Pharetra",
                url: "/pharetra"
            }
        ]
    }
];
