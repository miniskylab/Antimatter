import React, {cloneElement, ReactElement} from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {CSSTransitionClassNames} from "react-transition-group/CSSTransition";
import {TransitionProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class Transition extends React.Component<TransitionProps>
{
    static defaultProps: Partial<TransitionProps> = {
        classNames: {
            appear: String.EMPTY,
            appearActive: String.EMPTY,
            appearDone: String.EMPTY,
            enter: String.EMPTY,
            enterActive: String.EMPTY,
            enterDone: String.EMPTY,
            exit: String.EMPTY,
            exitActive: String.EMPTY,
            exitDone: String.EMPTY
        }
    };

    private static transitionEndListener(node: HTMLElement, done: () => void)
    {
        node.addEventListener("transitionend", done, false);
    }

    render(): JSX.Element
    {
        return (
            <TransitionGroup
                className={this.props.className}
                childFactory={this.getChildFactory(this.props.classNames)}
            >
                <CSSTransition<undefined>
                    key={this.props.childIdentifier}
                    timeout={this.props.msTimeout}
                    addEndListener={this.props.msTimeout ? undefined : Transition.transitionEndListener}
                    classNames={this.props.classNames}
                >
                    {this.props.children}
                </CSSTransition>
            </TransitionGroup>
        );
    }

    private getChildFactory(classNames: CSSTransitionClassNames): (child: JSX.Element) => ReactElement
    {
        return (child: JSX.Element) => cloneElement(child, {classNames});
    }
}
