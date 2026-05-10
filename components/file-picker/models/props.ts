import {
    ComponentName,
    ComponentProps,
    IsArray,
    IsInteger,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString
} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {type FilePickerStyle} from "./style";

@ComponentName("File Picker")
export class FilePickerProps extends ComponentProps<FilePickerStyle>
{
    /**
     * Specify the short description of the file picker.
     */
    @IsString()
    @IsOptional()
    readonly description?: string;


    /**
     * Specify all files that are managed by the file picker.
     */
    @IsNotEmpty({each: true})
    @IsArray()
    @IsOptional()
    readonly selectedFiles?: string[];


    /**
     * Specify the maximum number of files that can be managed by the file picker.
     */
    @IsPositive()
    @IsInteger()
    @IsNumber()
    @IsOptional()
    readonly maxSelectedFileCount?: number;


    /**
     * Specify additional information about the file picker.
     */
    @IsString()
    @IsOptional()
    readonly footnote?: string;


    /**
     * Specify the piece of code that will be executed when users select a file.
     */
    readonly onSelectFile?: (selectedFilePath: string) => void;
}
