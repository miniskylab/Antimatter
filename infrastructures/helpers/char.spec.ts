import {Char} from "@miniskylab/antimatter/infrastructures";

describe("how to use [Char.isDigit(...)]", (): void =>
{
    it("returns true if the given number is keycode of a digit", (): void =>
    {
        for (let i = 48; i <= 57; i++) expect(Char.isDigit(i)).toBe(true);
        for (let i = 96; i <= 105; i++) expect(Char.isDigit(i)).toBe(true);
        expect(Char.isDigit(undefined)).toBe(false);
        expect(Char.isDigit(null)).toBe(false);
        expect(Char.isDigit(60)).toBe(false);
    });
});

describe("how to use [Char.isBackspace(...)]", (): void =>
{
    it("returns true if the given number is keycode of backspace character", (): void =>
    {
        expect(Char.isBackspace(8)).toBe(true);
        expect(Char.isBackspace(undefined)).toBe(false);
        expect(Char.isBackspace(null)).toBe(false);
        expect(Char.isBackspace(100)).toBe(false);
    });
});

describe("how to use [Char.isTab(...)]", (): void =>
{
    it("returns true if the given number is keycode of tab character", (): void =>
    {
        expect(Char.isTab(9)).toBe(true);
        expect(Char.isTab(undefined)).toBe(false);
        expect(Char.isTab(null)).toBe(false);
        expect(Char.isTab(100)).toBe(false);
    });
});

describe("how to use [Char.isMinus(...)]", (): void =>
{
    it("returns true if the given number is keycode of minus character", (): void =>
    {
        expect(Char.isMinus(109)).toBe(true);
        expect(Char.isMinus(189)).toBe(true);
        expect(Char.isMinus(undefined)).toBe(false);
        expect(Char.isMinus(null)).toBe(false);
        expect(Char.isMinus(100)).toBe(false);
    });
});

describe("how to use [Char.isDot(...)]", (): void =>
{
    it("returns true if the given number is keycode of dot character", (): void =>
    {
        expect(Char.isDot(110)).toBe(true);
        expect(Char.isDot(190)).toBe(true);
        expect(Char.isDot(undefined)).toBe(false);
        expect(Char.isDot(null)).toBe(false);
        expect(Char.isDot(100)).toBe(false);
    });
});
