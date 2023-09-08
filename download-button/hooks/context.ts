import {useContext} from "react";
import {DownloadButtonContext} from "../models";

export function useDownloadButtonContext(): DownloadButtonContext { return useContext(DownloadButtonContext); }
