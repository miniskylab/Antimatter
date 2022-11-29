import {bem} from "@miniskylab/antimatter-model";
import React, {createRef, RefObject} from "react";
import {Pips} from "./components";
import {RangeSliderProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class RangeSlider extends React.Component<RangeSliderProps>
{
    static defaultProps: Partial<RangeSliderProps> = {
        canInteractWith: true
    };

    private readonly freezoneRef: RefObject<HTMLDivElement>;

    constructor(props: RangeSliderProps)
    {
        super(props);

        this.freezoneRef = createRef<HTMLDivElement>();
    }

    render(): JSX.Element
    {
        return (
            <div className={bem(this.props.className)}>
                <div
                    className={bem(this.props.className, "Track", this.props.canInteractWith && "Interactable")}
                    onPointerDown={this.props.canInteractWith ? event => this.onPointerDownSlider(event) : undefined}
                >
                    <div className={bem(this.props.className, "StopperLeft")}/>
                    <div className={bem(this.props.className, "FreeZone")} ref={this.freezoneRef}>
                        <div
                            className={bem(this.props.className, "FillLeft")}
                            style={{width: `${this.toPercent(this.props.value)}%`}}
                        />
                        <div
                            style={{left: `${this.toPercent(this.props.value)}%`}}
                            className={bem(this.props.className, "Knob", this.props.canInteractWith && "Interactable")}
                            onPointerDown={this.props.canInteractWith ? event => this.onPointerDownKnob(event) : undefined}
                        >
                        </div>
                        <div
                            className={bem(this.props.className, "FillRight")}
                            style={{width: `${100 - this.toPercent(this.props.value)}%`}}
                        />
                    </div>
                    <div className={bem(this.props.className, "StopperRight")}/>
                </div>
                {
                    this.props.pipSettings &&
                    <Pips.Component
                        className={bem("RangeSlider-Pips")}
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
            pointerMoveEventTimerId = window.setTimeout(() =>
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
