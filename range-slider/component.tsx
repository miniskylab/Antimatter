import {Pips} from "@miniskylab/antimatter-pips";
import React, {createRef, RefObject} from "react";
import {Props} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class Component extends React.Component<Props>
{
    static defaultProps: Partial<Props> = {
        variant: Variant.Default,
        canInteractWith: true
    };

    private readonly freezoneRef: RefObject<HTMLDivElement>;

    constructor(props: Props)
    {
        super(props);

        this.freezoneRef = createRef<HTMLDivElement>();
    }

    render(): JSX.Element
    {
        return (
            <div className={this.props.variant["range-slider"]}>
                <div
                    className={this.props.variant[`range-slider__track${this.props.canInteractWith ? "--interactable" : String.EMPTY}`]}
                    onPointerDown={this.props.canInteractWith ? this.onPointerDownSlider.bind(this) : undefined}
                >
                    <div className={this.props.variant["range-slider__stopper-left"]}/>
                    <div
                        className={this.props.variant["range-slider__free-zone"]}
                        ref={this.freezoneRef}
                    >
                        <div
                            className={this.props.variant["range-slider__fill-left"]}
                            style={{width: `${this.toPercent(this.props.value)}%`}}
                        />
                        <div
                            className={
                                this.props.variant[`range-slider__knob${this.props.canInteractWith ? "--interactable" : String.EMPTY}`]
                            }
                            style={{left: `${this.toPercent(this.props.value)}%`}}
                            onPointerDown={this.props.canInteractWith ? this.onPointerDownKnob.bind(this) : undefined}
                        >
                        </div>
                        <div
                            className={this.props.variant["range-slider__fill-right"]}
                            style={{width: `${100 - this.toPercent(this.props.value)}%`}}
                        />
                    </div>
                    <div className={this.props.variant["range-slider__stopper-right"]}/>
                </div>
                {
                    this.props.pipSettings &&
                    <Pips
                        variant={this.props.pipSettings.variant}
                        minValue={this.props.minValue}
                        maxValue={this.props.maxValue}
                        step={this.props.pipSettings.step}
                        milestoneStep={this.props.pipSettings.milestoneStep}
                        startValue={this.props.minValue}
                        endValue={this.props.value}
                    />
                }
            </div>
        );
    }

    private update(pointerPositionX: number): void
    {
        const freezoneBoundingClientRect = this.freezoneRef.current.getBoundingClientRect();
        const sliderLength = freezoneBoundingClientRect.right - freezoneBoundingClientRect.left;
        const pctValue = (pointerPositionX - freezoneBoundingClientRect.left) / sliderLength;
        let value = this.toValue(pctValue);

        if (this.props.pipSettings?.canSnapToPip)
        {
            value = Math.round(value / (this.props.pipSettings.step)) * this.props.pipSettings.step;
        }

        value = value.clamp(this.props.minValue, this.props.maxValue);
        this.props.onChange?.(value);
    }

    private onPointerDownKnob(pointerDownEvent: React.PointerEvent<HTMLElement>): void
    {
        let pointerMoveEventTimerId = NaN;
        const onPointerMove = (pointerMoveEvent: PointerEvent): void =>
        {
            if (pointerMoveEventTimerId) return;
            pointerMoveEventTimerId = window.setTimeout((): void =>
            {
                pointerMoveEventTimerId = NaN;

                this.update(pointerMoveEvent.clientX);
                pointerMoveEvent.stopPropagation();
                pointerMoveEvent.preventDefault();
            }, (1 / 120) * 1000);
        };

        const onPointerUp = (pointerUpEvent: PointerEvent): void =>
        {
            document.removeEventListener("pointermove", onPointerMove);
            document.removeEventListener("pointerup", onPointerUp);
            pointerUpEvent.stopPropagation();
            pointerUpEvent.preventDefault();
        };

        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", onPointerUp);
        pointerDownEvent.stopPropagation();
        pointerDownEvent.preventDefault();
    }

    private onPointerDownSlider(pointerDownEvent: React.PointerEvent<HTMLElement>): void
    {
        this.update(pointerDownEvent.clientX);
        pointerDownEvent.stopPropagation();
        pointerDownEvent.preventDefault();
    }

    private toValue(pctValue: number): number
    {
        return this.props.minValue + pctValue * (this.props.maxValue - this.props.minValue);
    }

    private toPercent(value: number): number
    {
        return ((value - this.props.minValue) / (this.props.maxValue - this.props.minValue)).ensurePercent();
    }
}
