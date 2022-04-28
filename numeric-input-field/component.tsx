import {Char} from "@miniskylab/antimatter-typescript";
import React, {createRef, RefObject} from "react";
import {endWithDotAndZeros, isAllowedKey, removeCosmeticCharacters, removeNonDigitCharacters} from "./helper";
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
        minValue: Number.MIN,
        maxValue: Number.MAX,
        maximumFractionDigits: 20,
        maximumDigitCount: Number.MAX,
        placeholderText: String.EMPTY,
        showPlusSymbolForPositiveNumber: false
    };

    private caretPositionWhenKeydown: number;
    private selectedTextWhenKeydown: string;
    private nextCaretPosition: number;
    private lastKeycodeDown: number;
    private readonly ref: RefObject<HTMLInputElement>;

    constructor(props: Props)
    {
        super(props);

        this.ref = createRef<HTMLInputElement>();

        this.state = {
            userInput: props.defaultValue !== null && props.defaultValue !== undefined
                ? this.reformat(`${props.defaultValue}`).formattedUserInput
                : String.EMPTY
        };
    }

    componentDidUpdate(prevProps: Props): void
    {
        const hasFocus = this.ref.current === document.activeElement;
        const caretPositionIsValid = this.ref.current.selectionStart || this.ref.current.selectionStart === 0;
        if (hasFocus && caretPositionIsValid)
        {
            this.ref.current.setSelectionRange(this.nextCaretPosition, this.nextCaretPosition);
        }

        const updatedViaPropsChange = prevProps !== this.props;
        if (updatedViaPropsChange)
        {
            this.setState({userInput: this.reformat(this.state.userInput).formattedUserInput});
        }
    }

    render(): JSX.Element
    {
        return (
            <input
                ref={this.ref}
                type={"text"}
                className={this.props.variant["numeric-input-field"]}
                value={this.state.userInput}
                placeholder={this.props.placeholderText}
                onChange={this.onChange.bind(this)}
                onBlur={this.onBlur.bind(this)}
                onFocus={this.props.onFocus}
                onPointerDown={this.props.onPointerDown}
                onKeyDown={this.onKeyDown.bind(this)}
                autoFocus={this.props.autoFocus}
            />
        );
    }

    private onChange(changeEvent: React.ChangeEvent<HTMLInputElement>): void
    {
        let newUserInput = changeEvent.target.value.replace(/^(-?0)0*/, "$1");
        if (removeNonDigitCharacters(newUserInput).length > this.props.maximumDigitCount)
        {
            this.nextCaretPosition = this.caretPositionWhenKeydown;
            this.setState({userInput: this.state.userInput});

            return;
        }

        let {numericValue: nextValue, formattedUserInput: nextUserInput} = this.reformat(newUserInput);
        if (Char.isDelete(this.lastKeycodeDown) && this.state.userInput === nextUserInput && !this.selectedTextWhenKeydown)
        {
            newUserInput = newUserInput.slice(0, this.caretPositionWhenKeydown) + newUserInput.slice(this.caretPositionWhenKeydown + 1);
            const reformationResult = this.reformat(newUserInput);

            nextValue = reformationResult.numericValue;
            nextUserInput = reformationResult.formattedUserInput;
        }

        if (isNaN(nextValue))
        {
            if (Char.isV(this.lastKeycodeDown))
            {
                this.nextCaretPosition = this.caretPositionWhenKeydown;
                this.setState({userInput: this.state.userInput});
            }
            else if (["0-", "+0-"].includes(newUserInput))
            {
                this.nextCaretPosition = this.ref.current.selectionStart;
                this.setState({userInput: "-"});
                this.props.onChange?.(0);
            }
            else if ([String.EMPTY, "+"].includes(newUserInput))
            {
                this.nextCaretPosition = 0;
                this.setState({userInput: String.EMPTY});
                this.props.onChange?.(undefined);
            }
            else
            {
                this.nextCaretPosition = this.caretPositionWhenKeydown;
                this.setState({userInput: this.state.userInput});
            }

            return;
        }

        if (Char.isV(this.lastKeycodeDown))
        {
            const pastedString = removeCosmeticCharacters(
                changeEvent.target.value.substring(this.caretPositionWhenKeydown, this.ref.current.selectionStart)
            );

            if (
                pastedString.match(/^0+$/g) &&
                (
                    (!this.props.showPlusSymbolForPositiveNumber && this.caretPositionWhenKeydown === 0) ||
                    (this.props.showPlusSymbolForPositiveNumber && this.caretPositionWhenKeydown === 1)
                )
            )
            {
                this.nextCaretPosition = this.caretPositionWhenKeydown;
            }
            else
            {
                const newUserInputCharacterArray = newUserInput.split(String.EMPTY);
                for (let i = this.caretPositionWhenKeydown; i < this.ref.current.selectionStart; i++)
                {
                    newUserInputCharacterArray[i] = String.EMPTY;
                }

                newUserInput = newUserInputCharacterArray.join(String.EMPTY);
                newUserInput = [
                    newUserInput.slice(0, this.caretPositionWhenKeydown),
                    pastedString,
                    newUserInput.slice(this.caretPositionWhenKeydown)
                ].join(String.EMPTY);

                this.nextCaretPosition = this.caretPositionWhenKeydown + pastedString.length;
            }
        }

        const setNextCaretPosition = (): void =>
        {
            this.nextCaretPosition = this.ref.current.selectionStart;

            const currentCommaCountBeforeCaret = this.state.userInput.substring(0, this.caretPositionWhenKeydown).split(",").length - 1;
            const nextCommaCountBeforeCaret = nextUserInput.substring(0, this.nextCaretPosition).split(",").length - 1;
            const commaCountBeforeCaretDifference = nextCommaCountBeforeCaret - currentCommaCountBeforeCaret;

            if (this.state.userInput === nextUserInput && !Char.isV(this.lastKeycodeDown))
            {
                this.nextCaretPosition = this.caretPositionWhenKeydown;
            }
            else if (
                removeCosmeticCharacters(this.state.userInput).startsWith("0.") &&
                removeCosmeticCharacters(newUserInput).startsWith("0") &&
                removeCosmeticCharacters(newUserInput).substring(1) === removeCosmeticCharacters(nextUserInput)
            )
            {
                this.nextCaretPosition -= 1;
            }

            this.nextCaretPosition += commaCountBeforeCaretDifference;

            if (
                nextValue >= 0 && this.props.showPlusSymbolForPositiveNumber &&
                !newUserInput.startsWith("+") && nextUserInput.startsWith("+") &&
                !Char.isBackspace(this.lastKeycodeDown) && !Char.isDelete(this.lastKeycodeDown)
            )
            {
                this.nextCaretPosition += 1;
            }
            else if (nextValue < 0 && newUserInput.startsWith("+-"))
            {
                this.nextCaretPosition -= 1;
            }
        };
        setNextCaretPosition();

        this.setState({userInput: nextUserInput});
        this.props.onChange?.(nextValue);
    }

    private onBlur(focusEvent: React.FocusEvent<HTMLInputElement>): void
    {
        if (["-", "-0"].includes(this.state.userInput))
        {
            this.setState({userInput: "0"});
        }
        else if (this.props.showPlusSymbolForPositiveNumber && this.state.userInput === "+")
        {
            this.setState({userInput: "+0"});
            this.nextCaretPosition += 1;
        }
        else if (endWithDotAndZeros(this.state.userInput))
        {
            this.setState({userInput: this.state.userInput.replace(/\.0*$/g, String.EMPTY)});
        }

        this.props.onBlur?.(focusEvent);
    }

    private onKeyDown(keyboardEvent: React.KeyboardEvent<HTMLInputElement>): void
    {
        if (!isAllowedKey(keyboardEvent))
        {
            keyboardEvent.preventDefault();
            return;
        }
        else if (this.props.maximumFractionDigits <= 0 && Char.isDot(keyboardEvent.keyCode))
        {
            keyboardEvent.preventDefault();
            return;
        }
        else if (this.props.minValue >= 0 && Char.isMinus(keyboardEvent.keyCode))
        {
            keyboardEvent.preventDefault();
            return;
        }

        this.lastKeycodeDown = keyboardEvent.keyCode;
        this.selectedTextWhenKeydown = keyboardEvent.currentTarget.value.substring(
            this.ref.current.selectionStart,
            this.ref.current.selectionEnd
        );
        this.caretPositionWhenKeydown = this.ref.current.selectionStart;
        this.props.onKeyDown?.(keyboardEvent);
    }

    private removeRedundantFractionDigits(userInput: string): string
    {
        const matches = userInput.match(new RegExp(`^[^.]*?\.\d{{${this.props.maximumFractionDigits}}}`));
        return matches ? matches[0] : userInput;
    }

    private tryParseNumber(userInput: string): number
    {
        if (removeCosmeticCharacters(userInput) === String.EMPTY) return NaN;
        if (removeCosmeticCharacters(userInput) === "-") return 0;

        const result = +removeCosmeticCharacters(this.removeRedundantFractionDigits(userInput));
        if (!isNaN(result))
        {
            const {maximumFractionDigits} = this.props;
            const userInputHasTooManyFractionDigits = userInput.substr(userInput.indexOf(".") + 1).length > maximumFractionDigits;
            if (userInput.indexOf(".") >= 0 && userInputHasTooManyFractionDigits)
            {
                return NaN;
            }
        }

        return result;
    }

    private reformat(userInput: string): { numericValue: number; formattedUserInput: string }
    {
        let value = this.tryParseNumber(userInput);
        if (value < this.props.minValue)
        {
            value = this.props.minValue;
        }
        else if (value > this.props.maxValue)
        {
            value = this.props.maxValue;
        }

        if (isNaN(value))
        {
            return {
                numericValue: NaN,
                formattedUserInput: String.EMPTY
            };
        }

        const showPlusSymbol = value >= 0 && this.props.showPlusSymbolForPositiveNumber;
        return {
            numericValue: value,
            formattedUserInput: ["-", "-0"].includes(userInput) || endWithDotAndZeros(userInput)
                ? userInput
                : showPlusSymbol
                    ? `+${value.toLocaleString("en-us", {maximumFractionDigits: this.props.maximumFractionDigits})}`
                    : value.toLocaleString("en-us", {maximumFractionDigits: this.props.maximumFractionDigits})
        };
    }
}
