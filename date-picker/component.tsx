import {Calendar, Variant as CalendarVariant} from "@miniskylab/antimatter-calendar";
import {Icon, IconName} from "@miniskylab/antimatter-icon-legacy";
import {Char, DateFormat, GregorianCalendar} from "@miniskylab/antimatter-typescript";
import React, {createRef, RefObject} from "react";
import {isAllowedKey, isDigit, reformat, removeNonDigitCharacters, tryParseDate} from "./helper";
import {Props, State} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class Component extends React.Component<Props, State>
{
    static defaultProps: Partial<Props> = {
        variant: Variant.Default,
        autoFocus: false,
        disableTyping: false,
        placeholderText: String.EMPTY
    };

    private caretPositionWhenKeydown: number;
    private selectedTextWhenKeydown: string;
    private nextCaretPosition: number;
    private lastKeycodeDown: number;
    private readonly inputFieldRef: RefObject<HTMLInputElement>;
    private readonly calendarRef: RefObject<HTMLDivElement>;

    constructor(props: Props)
    {
        super(props);

        this.inputFieldRef = createRef<HTMLInputElement>();
        this.calendarRef = createRef<HTMLDivElement>();

        this.state = {
            calendarIsOpen: false,
            selectedDate: props.defaultSelectedDate,
            userInput: GregorianCalendar.toString(props.defaultSelectedDate)
        };
    }

    componentDidUpdate(): void
    {
        const inputFieldHasFocus = this.inputFieldRef.current === document.activeElement;
        const caretPositionIsValid = this.inputFieldRef.current.selectionStart || this.inputFieldRef.current.selectionStart === 0;
        if (inputFieldHasFocus && caretPositionIsValid)
        {
            this.inputFieldRef.current.setSelectionRange(this.nextCaretPosition, this.nextCaretPosition);
        }

        this.calendarRef.current?.focus();
    }

    render(): JSX.Element
    {
        return (
            <div className={this.props.variant[`date-picker${this.state.calendarIsOpen ? "--active" : String.EMPTY}`]}>
                {this.renderInputField()}
                {this.renderAddon()}
                {this.state.calendarIsOpen && this.renderCalendar()}
            </div>
        );
    }

    private renderInputField(): JSX.Element
    {
        return (
            <input
                ref={this.inputFieldRef}
                type={"text"}
                className={this.props.variant["date-picker__input-field"]}
                value={this.getDateString()}
                placeholder={this.props.placeholderText}
                onChange={this.onChange.bind(this)}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                onPointerDown={this.props.onPointerDown}
                onKeyDown={this.onKeyDown.bind(this)}
                autoFocus={this.props.autoFocus}
                readOnly={this.props.disableTyping}
            />
        );
    }

    private getDateString(): string
    {
        return this.props.disableTyping && this.state.selectedDate
            ? GregorianCalendar.toString(this.state.selectedDate, DateFormat.Full)
            : this.state.userInput;
    }

    private renderAddon(): JSX.Element
    {
        return (
            <Icon
                className={this.props.variant[`date-picker__addon${this.state.calendarIsOpen ? "--active" : String.EMPTY}`]}
                iconName={IconName.Calendar}
                onClick={this.onAddonClick.bind(this)}
                onPointerDown={event => event.preventDefault()}
            />
        );
    }

    private renderCalendar(): JSX.Element
    {
        return (
            <div
                tabIndex={-1}
                ref={this.calendarRef}
                className={this.props.variant["date-picker__calendar"]}
                onMouseDown={event => event.preventDefault()}
                onBlur={() => { this.setState({calendarIsOpen: false}); }}
            >
                <div className={this.props.variant["date-picker__caret"]}/>
                <Calendar
                    variant={CalendarVariant.Mini}
                    selectedDate={this.state.selectedDate}
                    onChange={this.onDateSelectedFromCalendar.bind(this)}
                />
            </div>
        );
    }

    private onChange(changeEvent: React.ChangeEvent<HTMLInputElement>): void
    {
        let newUserInput = changeEvent.target.value;
        let nextUserInput = newUserInput;
        const maxUserInputLength = 8;
        const forwardSlashTokenLength = 3;

        if (removeNonDigitCharacters(newUserInput).length > maxUserInputLength)
        {
            this.nextCaretPosition = this.caretPositionWhenKeydown;
            this.setState({userInput: this.state.userInput});

            return;
        }

        nextUserInput = reformat(newUserInput);

        this.nextCaretPosition = this.inputFieldRef.current.selectionStart;
        if (this.state.userInput === nextUserInput)
        {
            const setCaretPositionToTheBeginningOfCurrentForwardSlashToken = (): void =>
            {
                this.nextCaretPosition = this.caretPositionWhenKeydown;
                while (!isDigit(this.state.userInput[this.nextCaretPosition]) && this.nextCaretPosition < this.state.userInput.length)
                {
                    this.nextCaretPosition++;
                }

                this.nextCaretPosition -= forwardSlashTokenLength;
            };

            if (Char.isBackspace(this.lastKeycodeDown))
            {
                setCaretPositionToTheBeginningOfCurrentForwardSlashToken();
            }
            else if (Char.isDelete(this.lastKeycodeDown))
            {
                setCaretPositionToTheBeginningOfCurrentForwardSlashToken();

                if (!this.selectedTextWhenKeydown)
                {
                    newUserInput = newUserInput.slice(0, this.nextCaretPosition) +
                                   newUserInput.slice(this.nextCaretPosition + forwardSlashTokenLength);

                    nextUserInput = reformat(newUserInput);
                }

                this.nextCaretPosition = this.caretPositionWhenKeydown;
            }
            else
            {
                this.nextCaretPosition = this.caretPositionWhenKeydown;
            }
        }
        else if (!Char.isBackspace(this.lastKeycodeDown) && !Char.isDelete(this.lastKeycodeDown))
        {
            const moveCaretForwardIfATokenWasCompleted = (): void =>
            {
                const monthTokenStartIndex = 2;
                const yearTokenStartIndex = 7;

                this.nextCaretPosition = this.inputFieldRef.current.selectionStart;
                if (Char.isV(this.lastKeycodeDown))
                {
                    const pastedString = removeNonDigitCharacters(
                        changeEvent.target.value.substring(this.caretPositionWhenKeydown, this.inputFieldRef.current.selectionStart)
                    );

                    this.nextCaretPosition = this.caretPositionWhenKeydown + pastedString.length;
                    if (pastedString.length >= 4)
                    {
                        this.nextCaretPosition += 2 * forwardSlashTokenLength;
                    }
                    else if (pastedString.length >= 2 && this.caretPositionWhenKeydown < yearTokenStartIndex)
                    {
                        this.nextCaretPosition += forwardSlashTokenLength;
                    }
                }
                else if (
                    this.inputFieldRef.current.selectionStart >= monthTokenStartIndex &&
                    this.inputFieldRef.current.selectionStart <= monthTokenStartIndex + forwardSlashTokenLength
                )
                {
                    this.nextCaretPosition += monthTokenStartIndex - this.inputFieldRef.current.selectionStart + forwardSlashTokenLength;
                    if (this.inputFieldRef.current.selectionStart > monthTokenStartIndex)
                    {
                        this.nextCaretPosition++;
                    }
                }
                else if (
                    this.inputFieldRef.current.selectionStart >= yearTokenStartIndex &&
                    this.inputFieldRef.current.selectionStart <= yearTokenStartIndex + forwardSlashTokenLength
                )
                {
                    this.nextCaretPosition += yearTokenStartIndex - this.inputFieldRef.current.selectionStart + forwardSlashTokenLength;
                    if (this.inputFieldRef.current.selectionStart > yearTokenStartIndex)
                    {
                        this.nextCaretPosition++;
                    }
                }
            };
            moveCaretForwardIfATokenWasCompleted();
        }

        const nextSelectedDate = tryParseDate(nextUserInput);
        if (!nextSelectedDate)
        {
            if (Char.isV(this.lastKeycodeDown))
            {
                this.nextCaretPosition = this.caretPositionWhenKeydown;
                this.setState({
                    selectedDate: undefined,
                    userInput: this.state.userInput
                });

                return;
            }
            else if (nextUserInput === String.EMPTY)
            {
                this.nextCaretPosition = 0;
                this.setState({
                    selectedDate: undefined,
                    userInput: nextUserInput
                });
                this.props.onChange?.(undefined);

                return;
            }
        }
        else
        {
            const today = new Date();
            nextSelectedDate.setHours(
                today.getHours(),
                today.getMinutes(),
                today.getSeconds(),
                today.getMilliseconds()
            );
        }

        this.setState({
            selectedDate: nextSelectedDate,
            userInput: nextUserInput
        });
        this.props.onChange?.(nextSelectedDate);
    }

    private onKeyDown(keyboardEvent: React.KeyboardEvent<HTMLInputElement>): void
    {
        if (!isAllowedKey(keyboardEvent))
        {
            keyboardEvent.preventDefault();
            return;
        }

        this.lastKeycodeDown = keyboardEvent.keyCode;
        this.selectedTextWhenKeydown = keyboardEvent.currentTarget.value.substring(
            this.inputFieldRef.current.selectionStart,
            this.inputFieldRef.current.selectionEnd
        );
        this.caretPositionWhenKeydown = this.inputFieldRef.current.selectionStart;
        this.props.onKeyDown?.(keyboardEvent);
    }

    private onAddonClick(): void
    {
        this.setState({calendarIsOpen: !this.state.calendarIsOpen});
    }

    private onDateSelectedFromCalendar(newlySelectedDate: Date): void
    {
        this.setState({
            selectedDate: newlySelectedDate,
            calendarIsOpen: !newlySelectedDate,
            userInput: GregorianCalendar.toString(newlySelectedDate)
        });
        this.props.onChange?.(newlySelectedDate);
    }
}
