import {bem} from "@miniskylab/antimatter-model";
import React, {createRef, RefObject} from "react";
import {Props} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class Component extends React.Component<Props>
{
    static defaultProps: Partial<Props> = {};

    private pipCount: number;
    private readonly ref: RefObject<HTMLDivElement>;

    constructor(props: Props)
    {
        super(props);

        this.pipCount = 0;
        this.ref = createRef<HTMLDivElement>();
    }

    render(): JSX.Element
    {
        this.pipCount = Math.round((this.props.maxValue - this.props.minValue) / this.props.step);

        return (
            <div ref={this.ref} className={bem(this.props.className)}>
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
            let modifier = String.EMPTY;
            if (this.isMilestonePip(pipIndex) && this.isHighlightedPip(pipIndex))
            {
                modifier = "HighlightedMilestone";
            }
            else if (this.isMilestonePip(pipIndex))
            {
                modifier = "Milestone";
            }
            else if (this.isHighlightedPip(pipIndex))
            {
                modifier = "Highlighted";
            }

            const pctPipValue = this.getPctPipValue(pipIndex);
            pips.push(
                <div
                    key={pipIndex}
                    className={bem(this.props.className, "Pip", modifier)}
                    style={{left: `${pctPipValue.ensurePercent()}%`}}
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

            let modifier = String.EMPTY;
            if (this.isHighlightedPip(pipIndex))
            {
                modifier = "Highlighted";
            }

            const pctPipValue = this.getPctPipValue(pipIndex);
            const labelText = (pctPipValue * (this.props.maxValue - this.props.minValue) + this.props.minValue).shorten();
            labels.push(
                <div
                    key={pipIndex}
                    className={bem(this.props.className, "Label", modifier)}
                    style={this.isMilestonePip(pipIndex) ? {left: `${pctPipValue.ensurePercent()}%`} : undefined}
                >
                    {labelText}
                </div>
            );
        }

        return labels;
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
        const pctPipValue = this.getPctPipValue(pipIndex);
        const pctStartValue = (this.props.startValue - this.props.minValue) / (this.props.maxValue - this.props.minValue);
        const pctEndValue = (this.props.endValue - this.props.minValue) / (this.props.maxValue - this.props.minValue);

        return Math.abs(pctPipValue - pctStartValue) < 0.001 ||
               Math.abs(pctPipValue - pctEndValue) < 0.001 ||
               (pctStartValue < pctPipValue && pctPipValue < pctEndValue);
    }
}
