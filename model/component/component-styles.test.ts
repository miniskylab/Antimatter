import {bem} from "@miniskylab/antimatter-model";

describe("how to use [bem(...)]", (): void =>
{
    it("returns a CSS selector that complies to BEM syntax.", (): void =>
    {
        expect(bem("block")).toBe("block");
        expect(bem("block", "element")).toBe("block__element");
        expect(bem("block", "element", "modifier")).toBe("block__element--modifier");
        expect(bem("block", null, "modifier")).toBe("block--modifier");

        expect(bem("button button--primary")).toBe("button button--primary");
        expect(bem("button button--primary", "icon")).toBe("button__icon");
        expect(bem("button button--primary", "icon", "small")).toBe("button__icon--small");

        expect(bem("button--primary", "icon", "small")).toBe("button__icon--small");
        expect(bem("block__element--modifier")).toBe("block__element block__element--modifier");
    });
});
