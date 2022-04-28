import {Icon, IconName} from "@miniskylab/antimatter-icon";
import {Pips, Shape} from "@miniskylab/antimatter-pips";
import React, {createRef, RefObject} from "react";
import {Knob, Props} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class Component extends React.Component<Props>
{
    static defaultProps: Partial<Props> = {
        variant: Variant.Default,
        startValue: 0,
        endValue: 0
    };

    private readonly canvasResolution: number;
    private readonly ref: RefObject<HTMLDivElement>;
    private readonly canvasRef: RefObject<HTMLCanvasElement>;

    constructor(props: Props)
    {
        super(props);

        this.canvasResolution = 512;
        this.ref = createRef<HTMLDivElement>();
        this.canvasRef = createRef<HTMLCanvasElement>();
    }

    render(): JSX.Element
    {
        return (
            <div
                ref={this.ref}
                className={this.props.variant["circular-slider"]}
            >
                <div className={this.props.variant["circular-slider__track-outer-border"]}>
                    <div className={this.props.variant["circular-slider__track-inner-border"]}>
                        {
                            this.props.pipSettings &&
                            <Pips
                                variant={this.props.pipSettings.variant}
                                shape={Shape.Circle}
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
                    className={this.props.variant["circular-slider__fill-canvas"]}
                    width={this.canvasResolution}
                    height={this.canvasResolution}
                >
                </canvas>
                <div
                    className={this.props.variant["circular-slider__rotor"]}
                    style={{transform: `rotate(${this.toPercentage(this.props.startValue) * 360}deg)`}}
                >
                    <Icon
                        iconName={IconName.Moon}
                        className={this.props.variant["circular-slider__knob--start"]}
                        style={{transform: `rotate(-${this.toPercentage(this.props.startValue) * 360}deg)`}}
                        onPointerDown={(pointerEvent: React.PointerEvent<HTMLDivElement>): void =>
                        {
                            this.onPointerDownKnob(pointerEvent, Knob.StartKnob);
                        }}
                    />
                </div>
                <div
                    className={this.props.variant["circular-slider__rotor"]}
                    style={{transform: `rotate(${this.toPercentage(this.props.endValue) * 360}deg)`}}
                >
                    <Icon
                        iconName={IconName.Sun}
                        className={this.props.variant["circular-slider__knob--end"]}
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
            pointerMoveEventTimerId = window.setTimeout((): void =>
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
