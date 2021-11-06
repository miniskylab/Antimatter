import React, {Component, createRef, CSSProperties, RefObject} from "react";
import {PipsComponentProps} from "./models/pips-component-props";
import {PipsShape} from "./models/pips-shape";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class PipsComponent extends Component<PipsComponentProps>
{
    private pipCount: number;
    private pxPipsRadius: number;
    private readonly ref: RefObject<HTMLDivElement>;

    constructor(props: PipsComponentProps)
    {
        super(props);

        this.pipCount = 0;
        this.pxPipsRadius = 0;
        this.ref = createRef<HTMLDivElement>();
    }

    componentDidMount(): void { this.forceUpdate(); }

    componentDidUpdate(): void
    {
        const pxPipsRadius = this.ref.current.clientWidth.halve();
        if (this.pxPipsRadius === 0 && pxPipsRadius > 0)
        {
            this.pxPipsRadius = pxPipsRadius;
            this.setState({});
        }
        else
        {
            this.pxPipsRadius = 0;
        }
    }

    render(): JSX.Element
    {
        this.pipCount = Math.round((this.props.maxValue - this.props.minValue) / this.props.step);

        return (
            <div ref={this.ref} className={this.props.variant["pips"]}>
                {this.renderPips()}
                {this.renderLabels()}
            </div>
        );
    }

    private renderPips(): JSX.Element[]
    {
        const pips: JSX.Element[] = [];
        for (let pipIndex = 0; pipIndex <= this.pipCount; pipIndex++)
        {
            let pipClassName = "pips__pip";
            if (
                this.isMilestonePip(pipIndex) &&
                this.isHighlightedPip(pipIndex)
            )
            {
                pipClassName = "pips__pip--highlighted-milestone";
            }
            else if (this.isMilestonePip(pipIndex))
            {
                pipClassName = "pips__pip--milestone";
            }
            else if (this.isHighlightedPip(pipIndex))
            {
                pipClassName = "pips__pip--highlighted";
            }

            const pctPipValue = this.getPctPipValue(pipIndex);
            pips.push(
                <div
                    key={pipIndex}
                    className={this.props.variant[pipClassName]}
                    style={this.getPipStyles(pipIndex, pctPipValue)}
                />
            );
        }

        return pips;
    }

    private renderLabels(): JSX.Element[]
    {
        const labels: JSX.Element[] = [];
        for (let pipIndex = 0; pipIndex <= this.pipCount; pipIndex++)
        {
            if (!this.isMilestonePip(pipIndex))
            {
                continue;
            }

            let labelClassName = "pips__label";
            if (this.isHighlightedPip(pipIndex))
            {
                labelClassName = "pips__label--highlighted";
            }

            const pctPipValue = this.getPctPipValue(pipIndex);
            const labelText = (pctPipValue * (this.props.maxValue - this.props.minValue) + this.props.minValue).shorten();
            labels.push(
                <div
                    key={pipIndex}
                    className={this.props.variant[labelClassName]}
                    style={this.getLabelStyles(pipIndex, pctPipValue)}
                >
                    {
                        this.props.shape === PipsShape.Circle
                            ? <div style={{transform: `rotate(-${pctPipValue * 360}deg)`}}>{labelText}</div>
                            : labelText
                    }
                </div>
            );
        }

        return labels;
    }

    private getPipStyles(pipIndex: number, pctPipValue: number): CSSProperties
    {
        const isCircularPips = this.props.shape === PipsShape.Circle;
        if (isCircularPips)
        {
            return pipIndex !== 0
                ? {
                    transform: `translateX(-50%) rotate(${pctPipValue * 360}deg)`,
                    transformOrigin: `center ${this.pxPipsRadius}px`
                }
                : {display: "none"};
        }

        return {left: `${pctPipValue.ensurePercent()}%`};
    }

    private getLabelStyles(pipIndex: number, pctPipValue: number): CSSProperties
    {
        if (this.isMilestonePip(pipIndex))
        {
            const isCircularPips = this.props.shape === PipsShape.Circle;
            if (isCircularPips)
            {
                return pipIndex !== 0
                    ? {
                        transform: `translateX(-50%) rotate(${pctPipValue * 360}deg)`,
                        transformOrigin: `center ${this.pxPipsRadius}px`
                    }
                    : {display: "none"};
            }

            return {
                left: `${pctPipValue.ensurePercent()}%`
            };
        }
    }

    private getPctPipValue(pipIndex: number): number { return pipIndex * (1 / this.pipCount); }

    private isMilestonePip(pipIndex: number): boolean
    {
        if (Object.isNullOrUndefined(this.props.milestoneStep))
        {
            return false;
        }

        let wholeNumberPipIndex = pipIndex;
        let wholeNumberMilestoneIndexStep = this.props.milestoneStep / this.props.step;
        while (!Number.isInteger(wholeNumberPipIndex) || !Number.isInteger(wholeNumberMilestoneIndexStep))
        {
            wholeNumberPipIndex *= 10;
            wholeNumberMilestoneIndexStep *= 10;
        }

        return wholeNumberPipIndex % wholeNumberMilestoneIndexStep === 0;
    }

    private isHighlightedPip(pipIndex: number): boolean
    {
        if (this.props.shape === PipsShape.Circle && pipIndex === this.pipCount && this.props.startValue === this.props.minValue)
        {
            return true;
        }

        let pctPipValue = this.getPctPipValue(pipIndex);
        const pctStartValue = (this.props.startValue - this.props.minValue) / (this.props.maxValue - this.props.minValue);
        let pctEndValue = (this.props.endValue - this.props.minValue) / (this.props.maxValue - this.props.minValue);

        if (this.props.shape === PipsShape.Circle && pctEndValue < pctStartValue)
        {
            if (pctPipValue < pctEndValue || Math.abs(pctPipValue - pctEndValue) < 0.001)
            {
                pctPipValue += Number.ONE_HUNDRED_PERCENT;
            }

            pctEndValue += Number.ONE_HUNDRED_PERCENT;
        }

        return Math.abs(pctPipValue - pctStartValue) < 0.001 ||
               Math.abs(pctPipValue - pctEndValue) < 0.001 ||
               (pctStartValue < pctPipValue && pctPipValue < pctEndValue);
    }
}
