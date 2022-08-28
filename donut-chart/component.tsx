import {Label} from "@miniskylab/antimatter-label";
import {bem} from "@miniskylab/antimatter-model";
import {Radians} from "@miniskylab/antimatter-typescript";
import React, {createRef, RefObject} from "react";
import {DonutChartProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class DonutChart extends React.Component<DonutChartProps>
{
    static defaultProps: Partial<DonutChartProps> = {
        pctValue: 0
    };

    private canvasResolution: number;
    private readonly ref: RefObject<HTMLDivElement>;
    private readonly canvasRef: RefObject<HTMLCanvasElement>;

    constructor(props: DonutChartProps)
    {
        super(props);

        this.canvasResolution = 0;
        this.ref = createRef<HTMLDivElement>();
        this.canvasRef = createRef<HTMLCanvasElement>();
    }

    render(): JSX.Element
    {
        return (
            <div className={bem(this.props.className)} ref={this.ref}>
                <canvas
                    ref={this.canvasRef}
                    width={this.canvasResolution}
                    height={this.canvasResolution}
                    className={bem(this.props.className, "Canvas")}
                />
                <div className={bem(this.props.className, "Legend")}>
                    <Label className={bem("DonutChart-Value")} text={this.props.pctValue.ensurePercent().toFixed(0)}/>
                    <Label className={bem("DonutChart-PercentSymbol")} text={"%"}/>
                    <Label className={bem("DonutChart-Description")} text={this.props.description}/>
                </div>
            </div>
        );
    }

    componentDidMount(): void { this.forceUpdate(); }

    componentDidUpdate(): void
    {
        const canvasResolution = this.ref.current.clientWidth;
        if (this.canvasResolution === 0 && canvasResolution > 0)
        {
            this.canvasResolution = canvasResolution;
            this.setState({});
        }
        else
        {
            this.drawDonutChart();
            this.canvasResolution = 0;
        }
    }

    private drawDonutChart(): void
    {
        const canvasCtx: CanvasRenderingContext2D = this.canvasRef.current.getContext("2d");
        const pxStrokeWidth = parseInt(getComputedStyle(this.canvasRef.current).strokeWidth, 10);
        const pxOuterRadius = this.ref.current.clientWidth.halve();
        const pxInnerRadius = pxOuterRadius - pxStrokeWidth;

        canvasCtx.clearRect(0, 0, this.canvasResolution, this.canvasResolution);
        this.drawTrack(canvasCtx, pxInnerRadius, pxOuterRadius);
        this.drawFill(canvasCtx, pxInnerRadius, pxOuterRadius);
    }

    private drawTrack(canvasCtx: CanvasRenderingContext2D, pxInnerRadius: number, pxOuterRadius: number): void
    {
        canvasCtx.fillStyle = getComputedStyle(this.canvasRef.current).floodColor;
        canvasCtx.beginPath();
        canvasCtx.arc(pxOuterRadius, pxOuterRadius, pxOuterRadius, 0, Radians.fromPercent(1), false);
        canvasCtx.arc(pxOuterRadius, pxOuterRadius, pxInnerRadius, Radians.fromPercent(1), 0, true);
        canvasCtx.closePath();
        canvasCtx.fill();
    }

    private drawFill(canvasCtx: CanvasRenderingContext2D, pxInnerRadius: number, pxOuterRadius: number): void
    {
        const value = this.props.pctValue.percentToRadians();
        canvasCtx.fillStyle = getComputedStyle(this.canvasRef.current).fill;
        canvasCtx.beginPath();
        canvasCtx.arc(pxOuterRadius, pxOuterRadius, pxOuterRadius, 0, value, false);
        canvasCtx.arc(pxOuterRadius, pxOuterRadius, pxInnerRadius, value, 0, true);
        canvasCtx.closePath();
        canvasCtx.fill();
    }
}
