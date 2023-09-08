import {ComponentProps} from "@miniskylab/antimatter-framework";
import {Card} from "../components";

export type CardData = Omit<Card.Props, keyof ComponentProps<Card.Style>>;
