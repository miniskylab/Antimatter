import {bem} from "@miniskylab/antimatter-model";
import React from "react";
import {ColorSwatch} from "./components";
import {ColorSchemeProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function ColorScheme({
    className,
    swatches = []
}: ColorSchemeProps): JSX.Element
{
    return (
        <div className={bem(className)}>
            <div className={bem(className, "Row")}>
                <div className={bem(className, "HeaderName")}>Name</div>
                <div className={bem(className, "HeaderSwatches")}>Swatches</div>
            </div>
            {swatches.map((swatch, index) => (
                <div key={index} className={bem(className, "Row")}>
                    <div className={bem(className, "ColorDescription")}>
                        <div className={bem(className, "ColorTitle")}>{swatch.title}</div>
                        {swatch.subTitle && <div className={bem(className, "ColorSubTitle")}>{swatch.subTitle}</div>}
                    </div>
                    <div className={bem(className, "ColorSwatches")}>
                        {swatch.colors.map((color, index) => (
                            <ColorSwatch.Component key={index} className={bem("ColorScheme-ColorSwatch", null, color)}/>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
