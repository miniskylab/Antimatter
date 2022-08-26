import {Button} from "@miniskylab/antimatter-button";
import React from "react";
import {PaginatorProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class Paginator extends React.Component<PaginatorProps>
{
    static defaultProps: Partial<PaginatorProps> = {
        selectedPage: 1,
        maxTotalPagerCount: 8,
        maxMarginPagerCount: 1,
        nextLabel: "Next",
        prevLabel: "Prev"
    };

    private prevSelectedPage: number;

    constructor(props: PaginatorProps)
    {
        super(props);
        this.prevSelectedPage = props.selectedPage;
    }

    render(): JSX.Element
    {
        this.prevSelectedPage = this.props.selectedPage;

        return this.props.pageCount && this.props.pageCount > 0
            ? this.renderPagination()
            : null;
    }

    private renderPagination(): JSX.Element
    {
        return (
            <div className={this.props.className}>
                {this.renderNavigator(-1)}
                {this.renderPagers()}
                {this.renderNavigator(1)}
            </div>
        );
    }

    private renderNavigator(step: number): JSX.Element
    {
        if (step === 0) return;
        const noMorePage = (step > 0 && this.props.selectedPage === this.props.pageCount) || (step < 0 && this.props.selectedPage === 1);

        return (
            <Button
                className={`Paginator-Navigator${noMorePage ? "--Disabled" : String.EMPTY}`}
                label={step > 0 ? this.props.nextLabel : this.props.prevLabel}
                onClick={noMorePage ? undefined : () => { this.props.onPageChange?.(this.props.selectedPage + step); }}
            />
        );
    }

    private renderPagers(): JSX.Element[]
    {
        const marginCount = 2;
        const minPageBreakThreshold = 5;
        let marginPagerCount = this.props.maxMarginPagerCount;
        let pageBreakThreshold = marginPagerCount * marginCount + minPageBreakThreshold;
        while (marginPagerCount > 1 && pageBreakThreshold > this.props.maxTotalPagerCount)
        {
            marginPagerCount -= 1;
            pageBreakThreshold = marginPagerCount * marginCount + minPageBreakThreshold;
        }

        let pageNumbers = this.getPageNumbersWithoutPageBreak(pageBreakThreshold);
        if (pageNumbers.length <= 0)
        {
            pageNumbers = this.getPageNumbersWithPageBreak(marginPagerCount);
        }

        return pageNumbers.map(pageNumber =>
        {
            const isEllipsis = pageNumber <= 0;
            const isSelectedPage = pageNumber > 0 && this.props.selectedPage === pageNumber;

            return (
                <Button
                    key={pageNumber}
                    className={isEllipsis ? "Paginator-Ellipsis" : `Paginator-Pager${isSelectedPage ? "--Selected" : String.EMPTY}`}
                    label={isEllipsis ? "..." : pageNumber.toString()}
                    onClick={isEllipsis || isSelectedPage ? undefined : () => { this.props.onPageChange?.(pageNumber); }}
                />
            );
        });
    }

    private getPageNumbersWithoutPageBreak(pageBreakThreshold: number): number[]
    {
        const pageNumbers: number[] = [];
        if (this.props.pageCount <= this.props.maxTotalPagerCount)
        {
            for (let pageNumber = 1; pageNumber < this.props.pageCount + 1; pageNumber++)
            {
                pageNumbers.push(pageNumber);
            }

            return pageNumbers;
        }

        if (this.props.maxTotalPagerCount < pageBreakThreshold)
        {
            pageNumbers.push(this.props.selectedPage);

            let remainingPagerCount = this.props.maxTotalPagerCount - 1;
            while (remainingPagerCount > 0)
            {
                let step = this.props.selectedPage < this.prevSelectedPage ? -1 : 1;
                if (this.props.selectedPage + step >= 1 && this.props.selectedPage + step <= this.props.pageCount)
                {
                    if (step < 0)
                    {
                        pageNumbers.unshift(this.props.selectedPage + step);
                    }
                    else
                    {
                        pageNumbers.push(this.props.selectedPage + step);
                    }

                    remainingPagerCount--;
                }

                step *= -1;

                if (this.props.selectedPage < this.prevSelectedPage && step < 0)
                {
                    step--;
                }
                else if (!(this.props.selectedPage < this.prevSelectedPage) && step > 0)
                {
                    step++;
                }
            }

            return pageNumbers;
        }

        return pageNumbers;
    }

    private getPageNumbersWithPageBreak(marginPagerCount: number): number[]
    {
        const leftEllipsis = -999999998;
        const rightEllipsis = -999999999;
        const initialPageNumber = 1;
        const ellipsisMinHiddenPagerCount = 2;
        const marginPagerCountIncludesEllipsis = marginPagerCount + ellipsisMinHiddenPagerCount;

        const leftGroup: number[] = [];
        for (let i = 1; i <= marginPagerCount; i++)
        {
            leftGroup.push(i);
        }

        if (this.props.selectedPage <= initialPageNumber + marginPagerCountIncludesEllipsis)
        {
            leftGroup.push(marginPagerCount + 1);
        }
        else
        {
            leftGroup.push(leftEllipsis);
        }

        const rightGroup: number[] = [];
        for (let i = this.props.pageCount; i > this.props.pageCount - marginPagerCount; i--)
        {
            rightGroup.unshift(i);
        }

        if (this.props.selectedPage >= this.props.pageCount - marginPagerCountIncludesEllipsis)
        {
            rightGroup.unshift(this.props.pageCount - marginPagerCount);
        }
        else
        {
            rightGroup.unshift(rightEllipsis);
        }

        const middleGroup: number[] = [];
        let remainingPagerCount = this.props.maxTotalPagerCount - leftGroup.length - rightGroup.length;
        if (leftGroup[leftGroup.length - 1] < 0 && rightGroup[0] < 0)
        {
            middleGroup.push(this.props.selectedPage);
            remainingPagerCount--;

            let step = this.props.selectedPage < this.prevSelectedPage ? -1 : 1;
            while (remainingPagerCount > 0)
            {
                if (step < 0)
                {
                    middleGroup.unshift(this.props.selectedPage + step);
                }
                else
                {
                    middleGroup.push(this.props.selectedPage + step);
                }

                remainingPagerCount--;
                step *= -1;

                if (this.props.selectedPage < this.prevSelectedPage && step < 0)
                {
                    step--;
                }
                else if (!(this.props.selectedPage < this.prevSelectedPage) && step > 0)
                {
                    step++;
                }
            }

            return [...leftGroup, ...middleGroup, ...rightGroup];
        }

        if (leftGroup[leftGroup.length - 1] > 0)
        {
            let value = leftGroup[leftGroup.length - 1];
            while (remainingPagerCount > 0)
            {
                middleGroup.push(++value);
                remainingPagerCount--;
            }

            return [...leftGroup, ...middleGroup, ...rightGroup];
        }

        let value = rightGroup[0];
        while (remainingPagerCount > 0)
        {
            middleGroup.unshift(--value);
            remainingPagerCount--;
        }

        return [...leftGroup, ...middleGroup, ...rightGroup];
    }
}
