import React, {cloneElement, Component, ReactElement} from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {CSSTransitionClassNames} from "react-transition-group/CSSTransition";
import {TransitionComponentProps} from "./models/transition-component-props";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class TransitionComponent extends Component<TransitionComponentProps>
{
    private static transitionEndListener(node: HTMLElement, done: () => void)
    {
        node.addEventListener("transitionend", done, false);
    }

    render(): JSX.Element
    {
        return (
            <TransitionGroup
                className={this.props.variant["transition"]}
                childFactory={this.getChildFactory(this.props.classNames)}
            >
                <CSSTransition<undefined>
                    key={this.props.childIdentifier}
                    timeout={this.props.msTimeout}
                    addEndListener={
                        this.props.msTimeout
                            ? undefined
                            : TransitionComponent.transitionEndListener
                    }
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
