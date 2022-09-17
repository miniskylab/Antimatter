import {Button} from "@miniskylab/antimatter-button";
import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
import {Label} from "@miniskylab/antimatter-label";
import {bem} from "@miniskylab/antimatter-model";
import React from "react";
import {SidebarProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Sidebar({
    className
}: SidebarProps): JSX.Element
{
    return (
        <div className={bem(className)}>
            <Label className={bem("Sidebar-Category")} text={"Financial"}/>
            <Button className={bem("Sidebar-Link", null, "Selected")} icon={Icomoon.Health} label={"Expense Tracker"} href={"/expenses"}/>
            <Button className={bem("Sidebar-Link")} icon={Icomoon.Statistics} label={"Reports & Statistics"}/>
            <Label className={bem("Sidebar-Category")} text={"System"}/>
            <Button className={bem("Sidebar-Link")} icon={Icomoon.PriceTag} label={"Labels"} href={"/labels"}/>
            <Button className={bem("Sidebar-Link")} icon={Icomoon.Sun} label={"Table Design"}/>
            <Button className={bem("Sidebar-Link")} icon={Icomoon.Sun} label={"Form Controls"}/>
            <Button className={bem("Sidebar-Link")} icon={Icomoon.Sun} label={"Charts & Graphs"}/>
            <Label className={bem("Sidebar-Category")} text={"App Pages"}/>
            <Button className={bem("Sidebar-Link")} icon={Icomoon.Sun} label={"Basic"}/>
            <Button className={bem("Sidebar-Link")} icon={Icomoon.Sun} label={"Common"}/>
            <Button className={bem("Sidebar-Link")} icon={Icomoon.Sun} label={"Versions"}/>
        </div>
    );
}
