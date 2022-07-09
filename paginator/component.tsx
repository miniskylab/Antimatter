import React from "react";
import {Props} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class Component extends React.Component<Props>
{
    static defaultProps: Partial<Props> = {
        variant: Variant.Default,
        selectedPage: 1,
        maxMiddlePagerCount: 8,
        maxMarginPagerCount: 1,
        nextLabel: "Next",
        prevLabel: "Prev"
    };

    private prevSelectedPage: number;

    constructor(props: Props)
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
            <div className={this.props.variant["paginator"]}>
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
            <div
                className={this.props.variant[`paginator__navigator${noMorePage ? "--disabled" : String.EMPTY}`]}
                onMouseDown={noMorePage ? undefined : event => event.preventDefault()}
                onClick={noMorePage ? undefined : () => { this.props.onPageChange?.(this.props.selectedPage + step); }}
            >
                {step > 0 ? this.props.nextLabel : this.props.prevLabel}
            </div>
        );
    }

    private renderPagers(): JSX.Element[]
    {
        const marginCount = 2;
        const minPageBreakThreshold = 5;
        let marginPagerCount = this.props.maxMarginPagerCount;
        let pageBreakThreshold = marginPagerCount * marginCount + minPageBreakThreshold;
        while (marginPagerCount > 1 && pageBreakThreshold > this.props.maxMiddlePagerCount)
        {
            marginPagerCount -= 1;
            pageBreakThreshold = marginPagerCount * marginCount + minPageBreakThreshold;
        }

        let pageNumbers = this.tryGetPageNumbersWithoutPageBreak(pageBreakThreshold);
        if (pageNumbers.length <= 0)
        {
            pageNumbers = this.getPageNumbersWithPageBreak(marginPagerCount);
        }

        return pageNumbers.map(pageNumber =>
        {
            const isEllipsis = pageNumber <= 0;
            const isSelectedPage = pageNumber > 0 && this.props.selectedPage === pageNumber;
            const pagerCssClassName = `paginator__${isEllipsis ? "ellipsis" : `pager${isSelectedPage ? "--selected" : String.EMPTY}`}`;

            return (
                <div
                    key={pageNumber}
                    className={this.props.variant[pagerCssClassName]}
                    onMouseDown={isSelectedPage ? undefined : event => event.preventDefault()}
                    onClick={isSelectedPage ? undefined : () => { this.props.onPageChange?.(pageNumber); }}
                >
                    {isEllipsis ? "..." : pageNumber}
                </div>
            );
        });
    }

    private tryGetPageNumbersWithoutPageBreak(pageBreakThreshold: number): number[]
    {
        const pageNumbers: number[] = [];
        if (this.props.pageCount <= this.props.maxMiddlePagerCount)
        {
            for (let pageNumber = 1; pageNumber < this.props.pageCount + 1; pageNumber++)
            {
                pageNumbers.push(pageNumber);
            }

            return pageNumbers;
        }

        if (this.props.maxMiddlePagerCount < pageBreakThreshold)
        {
            pageNumbers.push(this.props.selectedPage);

            let remainingPagerCount = this.props.maxMiddlePagerCount - 1;
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
        const ellipsis = -9999;
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
            leftGroup.push(ellipsis);
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
            rightGroup.unshift(ellipsis);
        }

        const middleGroup: number[] = [];
        let remainingPagerCount = this.props.maxMiddlePagerCount - leftGroup.length - rightGroup.length;
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
