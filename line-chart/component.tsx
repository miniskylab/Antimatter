import React, {createRef, RefObject} from "react";
import {Coordinate, LineChartProps, LineSettings, LineStyle} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class LineChart extends React.Component<LineChartProps>
{
    static defaultProps: Partial<LineChartProps> = {
        className: "antimatter-line-chart-default",
        dataX: [],
        dataY: []
    };

    private browserResizeEventTimerId = NaN;
    private readonly browserResizeEventHandler: () => void;
    private readonly lineChartRef: RefObject<HTMLDivElement>;
    private readonly canvasRef: RefObject<HTMLCanvasElement>;
    private readonly paddingTop = 10;
    private readonly paddingBottom = 20;
    private readonly paddingLeft = 5;
    private readonly paddingRight = 45;
    private readonly gridColor = "#6E6E6E";
    private readonly defaultColor = "#9B9B9B";
    private componentIsMounted = false;
    private graphWidth: number;
    private graphHeight: number;
    private minY: number;
    private maxY: number;

    constructor(props: LineChartProps)
    {
        super(props);

        this.lineChartRef = createRef<HTMLDivElement>();
        this.canvasRef = createRef<HTMLCanvasElement>();
        this.browserResizeEventHandler = this.onBrowserResize.bind(this);
    }

    render(): JSX.Element
    {
        return (
            <div className={this.props.className} ref={this.lineChartRef}>
                <canvas className={`${this.props.className}__canvas`} ref={this.canvasRef}/>
            </div>
        );
    }

    componentDidMount(): void
    {
        this.componentIsMounted = true;
        window.addEventListener("resize", this.browserResizeEventHandler);

        this.drawLineChart();
        document.fonts.ready.then(() => { this.drawLineChart(); });
    }

    componentDidUpdate(): void { this.drawLineChart(); }

    componentWillUnmount(): void
    {
        this.componentIsMounted = false;
        window.removeEventListener("resize", this.browserResizeEventHandler);
    }

    private onBrowserResize(): void
    {
        if (this.browserResizeEventTimerId) return;
        this.browserResizeEventTimerId = window.setTimeout((): void =>
        {
            if (!this.componentIsMounted)
            {
                return;
            }

            this.browserResizeEventTimerId = NaN;
            this.forceUpdate();
        }, (1 / 60) * 1000);
    }

    private drawLineChart(): void
    {
        if (this.props.dataX.length === 0 || this.props.dataY.length === 0)
        {
            return;
        }

        const canvasWidth: number = this.lineChartRef.current.getBoundingClientRect().width;
        const canvasHeight: number = this.lineChartRef.current.getBoundingClientRect().height;
        this.canvasRef.current.width = canvasWidth;
        this.canvasRef.current.height = canvasHeight;

        const canvasCtx: CanvasRenderingContext2D = this.canvasRef.current.getContext("2d");
        canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
        canvasCtx.font = "bold 14px Roboto";
        canvasCtx.textBaseline = "middle";
        canvasCtx.fillStyle = this.defaultColor;

        this.graphWidth = canvasWidth - this.paddingLeft - this.paddingRight;
        this.graphHeight = canvasHeight - this.paddingTop - this.paddingBottom;
        this.calculateMinYAndMaxY();

        this.drawHorizontalAxes(canvasCtx);
        this.drawVerticalAxes(canvasCtx);
        this.drawLineGraphs(canvasCtx);
    }

    private drawHorizontalAxes(canvasCtx: CanvasRenderingContext2D): void
    {
        const labelPaddingLeft = 8;
        const {horizontalAxixCount, horizontalAxisValueStep} = this.getHorizontalAxisParameters();
        const horizontalAxisGap = this.graphHeight / horizontalAxixCount;
        for (let horizontalAxisIndex = 0; horizontalAxisIndex <= horizontalAxixCount; horizontalAxisIndex++)
        {
            const horizontalAxisValue = this.minY + horizontalAxisValueStep * horizontalAxisIndex;
            const horizontalAxisCoordinate = Math.trunc(this.graphHeight - horizontalAxisIndex * horizontalAxisGap) + this.paddingTop + 0.5;
            canvasCtx.beginPath();
            canvasCtx.setLineDash([1, 5]);
            canvasCtx.strokeStyle = this.gridColor;
            canvasCtx.moveTo(this.paddingLeft, horizontalAxisCoordinate);
            canvasCtx.lineTo(this.graphWidth, horizontalAxisCoordinate);

            if (horizontalAxisIndex === 0)
            {
                canvasCtx.lineWidth = 1;
                canvasCtx.setLineDash([]);
            }

            canvasCtx.fillText(`${horizontalAxisValue.shorten()}`, this.graphWidth + labelPaddingLeft, horizontalAxisCoordinate);
            canvasCtx.stroke();
        }

        canvasCtx.setLineDash([]);
    }

    private drawVerticalAxes(canvasCtx: CanvasRenderingContext2D): void
    {
        const pxLabelPaddingTop = 8;
        this.props.dataX.forEach((data, index): void =>
        {
            const canvasX = this.getCanvasCoordinate(index).x;
            canvasCtx.textBaseline = "top";

            canvasCtx.beginPath();
            canvasCtx.lineWidth = data.gridColor ? 2 : 1;
            canvasCtx.setLineDash(data.gridColor ? [] : [1, 5]);
            canvasCtx.strokeStyle = data.gridColor || this.gridColor;
            canvasCtx.moveTo(canvasX, this.paddingTop);
            canvasCtx.lineTo(canvasX, this.graphHeight + this.paddingTop);

            if (index === 0)
            {
                canvasCtx.textAlign = "left";
            }
            else if (index === this.props.dataX.length - 1)
            {
                canvasCtx.lineWidth = 1;
                canvasCtx.setLineDash([]);
                canvasCtx.textAlign = "right";
            }
            else
            {
                canvasCtx.textAlign = "center";
            }

            canvasCtx.fillText(data.value, canvasX, this.graphHeight + this.paddingTop + pxLabelPaddingTop);
            canvasCtx.stroke();
        });
        canvasCtx.setLineDash([]);
    }

    private drawLineGraphs(canvasCtx: CanvasRenderingContext2D): void
    {
        canvasCtx.lineWidth = 3;
        this.getLinesSettings().forEach((lineSettings): void =>
        {
            if (lineSettings.coordinates.length === 0)
            {
                return;
            }

            canvasCtx.beginPath();
            canvasCtx.strokeStyle = lineSettings.color || this.defaultColor;
            canvasCtx.moveTo(lineSettings.coordinates[0].x, lineSettings.coordinates[0].y);

            switch (lineSettings.style)
            {
                case LineStyle.Dash:
                    canvasCtx.setLineDash([10]);
                    break;
                case LineStyle.Dot:
                    canvasCtx.setLineDash([3, 4]);
                    break;
                case LineStyle.Solid:
                default:
                    canvasCtx.setLineDash([]);
            }

            let i: number;
            for (i = 0; i < lineSettings.coordinates.length - 1; i++)
            {
                const currentPoint = lineSettings.coordinates[i];
                const nextPoint = lineSettings.coordinates[i + 1];
                const midpointX = (currentPoint.x + nextPoint.x).halve();
                const midpointY = (currentPoint.y + nextPoint.y).halve();
                const firstControlPointX = (midpointX + currentPoint.x).halve();
                const secondControlPointX = (midpointX + nextPoint.x).halve();
                canvasCtx.quadraticCurveTo(firstControlPointX, currentPoint.y, midpointX, midpointY);
                canvasCtx.quadraticCurveTo(secondControlPointX, nextPoint.y, nextPoint.x, nextPoint.y);
            }
            canvasCtx.stroke();

            if (lineSettings.coordinates.length < this.props.dataX.length)
            {
                const lastPoint = lineSettings.coordinates[i];
                canvasCtx.beginPath();
                canvasCtx.fillStyle = lineSettings.color;
                canvasCtx.arc(lastPoint.x, lastPoint.y, 5, 0, Math.PI * 2);
                canvasCtx.fill();
            }
        });
        canvasCtx.setLineDash([]);
    }

    private calculateMinYAndMaxY(): void
    {
        this.minY = Math.min(...this.props.dataY.map((data): number => Math.min(...data.values)));
        this.maxY = Math.max(...this.props.dataY.map((data): number => Math.max(...data.values)));
        const minMaxDifference = this.maxY - this.minY;
        let dividend = minMaxDifference >= 10 ? minMaxDifference : 10;
        let divisor = 1;
        while (Math.abs(dividend) >= 1)
        {
            divisor *= 10;
            dividend /= divisor;
        }

        this.minY = Math.floor(this.minY / divisor) * divisor;
        this.maxY = Math.ceil(this.maxY / divisor) * divisor;
    }

    private getHorizontalAxisParameters(): { horizontalAxixCount: number; horizontalAxisValueStep: number; }
    {
        let horizontalAxixCount = 4;
        let horizontalAxisValueStep = (this.maxY - this.minY) / horizontalAxixCount;
        while ((this.maxY - this.minY) % horizontalAxixCount !== 0 || this.minY % horizontalAxisValueStep !== 0)
        {
            horizontalAxixCount++;
            horizontalAxisValueStep = (this.maxY - this.minY) / horizontalAxixCount;
        }
        return {horizontalAxixCount, horizontalAxisValueStep};
    }

    private getCanvasCoordinate(indexX: number, valueY = 0): Coordinate
    {
        const pctX = indexX / (this.props.dataX.length - 1);
        const pctY = (this.maxY - valueY) / (this.maxY - this.minY);
        const canvasX = Math.floor(pctX ? pctX * this.graphWidth : this.paddingLeft) + 0.5;
        const canvasY = Math.floor(pctY * this.graphHeight + this.paddingTop) + 0.5;
        return {x: canvasX, y: canvasY};
    }

    private getLinesSettings(): LineSettings[]
    {
        const linesSettings: LineSettings[] = [];
        this.props.dataY.forEach((dataY): void =>
        {
            const lineSettings: LineSettings = {
                coordinates: [],
                color: dataY.lineColor,
                style: dataY.lineStyle
            };

            this.props.dataX.forEach((_, index): void =>
            {
                if (index >= dataY.values.length) return;
                const valueY = dataY.values[index];
                lineSettings.coordinates.push(this.getCanvasCoordinate(index, valueY));
            });

            linesSettings.push(lineSettings);
        });

        return linesSettings;
    }
}
