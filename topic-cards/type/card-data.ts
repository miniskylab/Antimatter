import {ComponentProps} from "@miniskylab/antimatter-framework";
import {Card} from "../component";

export type CardData = Omit<Card.Props, keyof ComponentProps<Card.Style>>;
