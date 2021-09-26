import {OpenAPIV3_1} from "openapi-types";
import React, {useEffect} from "react";
import {apiList} from "./models/rapi-doc-api-list";
import {RapidDocComponentProps} from "./models/rapi-doc-component-props";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function RapiDocComponent(props: RapidDocComponentProps): JSX.Element
{
    useEffect(() =>
    {
        (async function (document)
        {
            const script = document.createElement("script");
            script.async = true;
            script.type = "text/javascript";

            type WebpackAssetManifest = { entrypoints: string[], files: Record<string, string> };
            const fetchWebpackAssetManifestResult = await fetch("/asset-manifest.json");
            const webpackAssetManifest = await fetchWebpackAssetManifestResult.json() as WebpackAssetManifest;
            script.src = `/${webpackAssetManifest.files["rapidoc.js"]}`;

            script.onload = function ()
            {
                type RapiDocElement = HTMLElement & { loadSpec: (specObject: OpenAPIV3_1.Document) => Record<string, unknown> };
                const rapiDocElement = document.getElementsByTagName("rapi-doc")[0] as RapiDocElement;
                rapiDocElement.loadSpec(apiList[props.apiName]);
            };

            document.getElementsByTagName("head")[0].appendChild(script);
        }(document));
    }, []);

    return (
        <rapi-doc
            heading-text={`${props.apiName} API`}
            bg-color={"#323232"}
            text-color={"#DCDCDC"}
            render-style={"view"}
            theme={"dark"}
            schema-style={"table"}
            schema-description-expanded={true}
            allow-spec-url-load={false}
            allow-spec-file-load={false}
            allow-schema-description-expand-toggle={false}
            style={{height: "100vh", width: "100%"}}
        >
            <br/>
        </rapi-doc>
    );
}
