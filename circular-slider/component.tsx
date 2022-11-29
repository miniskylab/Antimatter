import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
import {bem} from "@miniskylab/antimatter-model";
import React, {createRef, RefObject} from "react";
import {Pips} from "./components";
import {CircularSliderProps, Knob} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class CircularSlider extends React.Component<CircularSliderProps>
{
    static defaultProps: Partial<CircularSliderProps> = {
        startValue: 0,
        endValue: 0
    };

    private readonly canvasResolution: number;
    private readonly ref: RefObject<HTMLDivElement>;
    private readonly canvasRef: RefObject<HTMLCanvasElement>;

    constructor(props: CircularSliderProps)
    {
        super(props);

        this.canvasResolution = 512;
        this.ref = createRef<HTMLDivElement>();
        this.canvasRef = createRef<HTMLCanvasElement>();
    }

    render(): JSX.Element
    {
        return (
            <div ref={this.ref} className={bem(this.props.className)}>
                <div className={bem(this.props.className, "TrackOuterBorder")}>
                    <div className={bem(this.props.className, "TrackInnerBorder")}>
                        {
                            this.props.pipSettings &&
                            <Pips.Component
                                className={bem("CircularSlider-Pips")}
                                minValue={this.props.minValue}
                                maxValue={this.props.maxValue}
                                step={this.props.pipSettings.step}
                                milestoneStep={this.props.pipSettings.milestoneStep}
                                startValue={this.props.startValue}
                                endValue={this.props.endValue}
                            />
                        }
                    </div>
                </div>
                <canvas
                    ref={this.canvasRef}
                    className={bem(this.props.className, "FillCanvas")}
                    width={this.canvasResolution}
                    height={this.canvasResolution}
                >
                </canvas>
                <div
                    className={bem(this.props.className, "Rotor")}
                    style={{transform: `rotate(${this.toPercentage(this.props.startValue) * 360}deg)`}}
                >
                    <div
                        className={`${bem(this.props.className, "Knob", "Start")} ${Icomoon.Moon}`}
                        style={{transform: `rotate(-${this.toPercentage(this.props.startValue) * 360}deg)`}}
                        onPointerDown={(pointerEvent: React.PointerEvent<HTMLDivElement>): void =>
                        {
                            this.onPointerDownKnob(pointerEvent, Knob.StartKnob);
                        }}
                    />
                </div>
                <div
                    className={bem(this.props.className, "Rotor")}
                    style={{transform: `rotate(${this.toPercentage(this.props.endValue) * 360}deg)`}}
                >
                    <div
                        className={`${bem(this.props.className, "Knob", "End")} ${Icomoon.Sun}`}
                        style={{transform: `rotate(-${this.toPercentage(this.props.endValue) * 360}deg)`}}
                        onPointerDown={(pointerEvent: React.PointerEvent<HTMLDivElement>): void =>
                        {
                            this.onPointerDownKnob(pointerEvent, Knob.EndKnob);
                        }}
                    />
                </div>
            </div>
        );
    }

    componentDidMount(): void
    {
        this.drawDonutChart();
    }

    componentDidUpdate(): void
    {
        this.drawDonutChart();
    }

    private onPointerDownKnob(pointerDownEvent: React.PointerEvent<HTMLDivElement>, knob: Knob): void
    {
        let pointerMoveEventTimerId = NaN;
        const onPointerMove = (pointerMoveEvent: PointerEvent): void =>
        {
            if (pointerMoveEventTimerId) return;
            pointerMoveEventTimerId = window.setTimeout(() =>
            {
                pointerMoveEventTimerId = NaN;

                this.update(pointerMoveEvent.clientX, pointerMoveEvent.clientY, knob);
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

            this.props.onPointerUp?.();
        };

        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", onPointerUp);
        pointerDownEvent.stopPropagation();
        pointerDownEvent.preventDefault();
    }

    private update(pointerPositionX: number, pointerPositionY: number, knob: Knob): void
    {
        const boundingClientRect = this.ref.current.getBoundingClientRect();
        const centerX = (boundingClientRect.width.halve()) + boundingClientRect.left;
        const centerY = (boundingClientRect.height.halve()) + boundingClientRect.top;
        const deltaX = pointerPositionX - centerX;
        const deltaY = pointerPositionY - centerY;

        let degAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
        if (degAngle < 0)
        {
            degAngle += 360;
        }

        const pctNewValue = degAngle / 360;
        let newValue = this.toValue(pctNewValue);

        if (this.props.pipSettings?.canSnapToPip)
        {
            newValue = Math.round(newValue / (this.props.pipSettings.step)) * this.props.pipSettings.step;
        }

        if (newValue >= this.props.maxValue)
        {
            newValue = this.props.minValue;
        }

        newValue = newValue.clamp(this.props.minValue, this.props.maxValue);

        switch (knob)
        {
            case Knob.StartKnob:
                this.props.onChange?.(newValue, this.props.endValue);
                break;
            case Knob.EndKnob:
                this.props.onChange?.(this.props.startValue, newValue);
        }
    }

    private drawDonutChart(): void
    {
        const canvasRenderingContext2D = this.canvasRef.current.getContext("2d");
        canvasRenderingContext2D.clearRect(0, 0, this.canvasResolution, this.canvasResolution);

        const strokeWidth = 0.103 * this.canvasResolution;
        canvasRenderingContext2D.lineWidth = strokeWidth;
        canvasRenderingContext2D.lineCap = "round";

        const radStartAngle = this.toPercentage(this.props.startValue).percentToRadians();
        const radEndAngle = this.toPercentage(this.props.endValue).percentToRadians();
        canvasRenderingContext2D.beginPath();
        canvasRenderingContext2D.arc(
            this.canvasResolution.halve(),
            this.canvasResolution.halve(),
            this.canvasResolution.halve() - strokeWidth.halve(),
            radStartAngle,
            radEndAngle,
            false
        );

        canvasRenderingContext2D.strokeStyle = getComputedStyle(this.canvasRef.current).fill;
        canvasRenderingContext2D.stroke();
    }

    private toValue(pctValue: number): number
    {
        return this.props.minValue + pctValue * (this.props.maxValue - this.props.minValue);
    }

    private toPercentage(value: number): number
    {
        return (value - this.props.minValue) / (this.props.maxValue - this.props.minValue);
    }
}
