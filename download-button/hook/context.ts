import {useContext} from "react";
import {DownloadButtonContext} from "../model";

export function useDownloadButtonContext(): DownloadButtonContext { return useContext(DownloadButtonContext); }
