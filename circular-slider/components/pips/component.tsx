import React, {createRef, CSSProperties, RefObject} from "react";
import {Props} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class Component extends React.Component<Props>
{
    static defaultProps: Partial<Props> = {};

    private pipCount: number;
    private pxPipsRadius: number;
    private readonly ref: RefObject<HTMLDivElement>;

    constructor(props: Props)
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
            <div ref={this.ref} className={this.props.className}>
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
            let pipClassName = `${this.props.className}__pip`;
            if (this.isMilestonePip(pipIndex) && this.isHighlightedPip(pipIndex))
            {
                pipClassName = `${this.props.className}__pip--highlighted-milestone`;
            }
            else if (this.isMilestonePip(pipIndex))
            {
                pipClassName = `${this.props.className}__pip--milestone`;
            }
            else if (this.isHighlightedPip(pipIndex))
            {
                pipClassName = `${this.props.className}__pip--highlighted`;
            }

            const pctPipValue = this.getPctPipValue(pipIndex);
            pips.push(
                <div
                    key={pipIndex}
                    className={pipClassName}
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

            let labelClassName = `${this.props.className}__label`;
            if (this.isHighlightedPip(pipIndex))
            {
                labelClassName = `${this.props.className}__label--highlighted`;
            }

            const pctPipValue = this.getPctPipValue(pipIndex);
            const labelText = (pctPipValue * (this.props.maxValue - this.props.minValue) + this.props.minValue).shorten();
            labels.push(
                <div
                    key={pipIndex}
                    className={labelClassName}
                    style={this.getLabelStyles(pipIndex, pctPipValue)}
                >
                    {<div style={{transform: `rotate(-${pctPipValue * 360}deg)`}}>{labelText}</div>}
                </div>
            );
        }

        return labels;
    }

    private getPipStyles(pipIndex: number, pctPipValue: number): CSSProperties
    {
        return pipIndex !== 0
            ? {
                transform: `translateX(-50%) rotate(${pctPipValue * 360}deg)`,
                transformOrigin: `center ${this.pxPipsRadius}px`
            }
            : {display: "none"};
    }

    private getLabelStyles(pipIndex: number, pctPipValue: number): CSSProperties
    {
        if (this.isMilestonePip(pipIndex))
        {
            return pipIndex !== 0
                ? {
                    transform: `translateX(-50%) rotate(${pctPipValue * 360}deg)`,
                    transformOrigin: `center ${this.pxPipsRadius}px`
                }
                : {display: "none"};
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
        if (pipIndex === this.pipCount && this.props.startValue === this.props.minValue)
        {
            return true;
        }

        let pctPipValue = this.getPctPipValue(pipIndex);
        const pctStartValue = (this.props.startValue - this.props.minValue) / (this.props.maxValue - this.props.minValue);
        let pctEndValue = (this.props.endValue - this.props.minValue) / (this.props.maxValue - this.props.minValue);

        if (pctEndValue < pctStartValue)
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
