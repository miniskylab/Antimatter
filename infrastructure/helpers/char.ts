class _Char
{
    readonly space = "\u00A0";

    isDigit(keyCode: number): boolean { return (48 <= keyCode && keyCode <= 57) || (96 <= keyCode && keyCode <= 105); }

    isBackspace(keyCode: number): boolean { return keyCode === 8; }

    isTab(keyCode: number): boolean { return keyCode === 9; }

    isMinus(keyCode: number): boolean { return keyCode === 109 || keyCode === 189; }

    isDot(keyCode: number): boolean { return keyCode === 110 || keyCode === 190; }

    isLeftArrow(keyCode: number): boolean { return keyCode === 37; }

    isRightArrow(keyCode: number): boolean { return keyCode === 39; }

    isHome(keyCode: number): boolean { return keyCode === 36; }

    isEnd(keyCode: number): boolean { return keyCode === 35; }

    isDelete(keyCode: number): boolean { return keyCode === 46; }

    isA(keyCode: number): boolean { return keyCode === 65; }

    isC(keyCode: number): boolean { return keyCode === 67; }

    isV(keyCode: number): boolean { return keyCode === 86; }

    isX(keyCode: number): boolean { return keyCode === 88; }
}

export const Char = new _Char();
