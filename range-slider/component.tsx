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
            <div className={this.props.className}>
                <div
                    className={`${this.props.className}__Track${this.props.canInteractWith ? "--Interactable" : String.EMPTY}`}
                    onPointerDown={this.props.canInteractWith ? event => this.onPointerDownSlider(event) : undefined}
                >
                    <div className={`${this.props.className}__StopperLeft`}/>
                    <div className={`${this.props.className}__FreeZone`} ref={this.freezoneRef}>
                        <div
                            className={`${this.props.className}__FillLeft`}
                            style={{width: `${this.toPercent(this.props.value)}%`}}
                        />
                        <div
                            style={{left: `${this.toPercent(this.props.value)}%`}}
                            className={`${this.props.className}__Knob${this.props.canInteractWith ? "--Interactable" : String.EMPTY}`}
                            onPointerDown={this.props.canInteractWith ? event => this.onPointerDownKnob(event) : undefined}
                        >
                        </div>
                        <div
                            className={`${this.props.className}__FillRight`}
                            style={{width: `${100 - this.toPercent(this.props.value)}%`}}
                        />
                    </div>
                    <div className={`${this.props.className}__StopperRight`}/>
                </div>
                {
                    this.props.pipSettings &&
                    <Pips.Component
                        className={"RangeSlider-Pips"}
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
