import {
    ComponentName,
    ComponentProps,
    IsArray,
    IsDefined,
    IsInteger,
    IsNumber,
    IsPositive,
    IsString
} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {FileSelectionButton} from "../classes";
import {FileRow} from "../components";
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
     * Specify the file selection button.
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => FileSelectionButton)
    readonly fileSelectionButton: FileSelectionButton;


    /**
     * Specify all files that are managed by the file picker.
     */
    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => FileRow.Props)
    readonly files?: FileRow.FileData[];


    /**
     * Specify the maximum number of files that can be managed by the file picker.
     */
    @IsPositive()
    @IsInteger()
    @IsNumber()
    @IsOptional()
    readonly maxFileCount?: number;


    /**
     * Specify the maximum allowed file size in bytes.
     */
    @IsPositive()
    @IsInteger()
    @IsNumber()
    @IsOptional()
    readonly byteMaxFileSize?: number;


    /**
     * Specify additional information about the file picker.
     */
    @IsString()
    @IsOptional()
    readonly footnote?: string;


    /**
     * Specify the piece of code that will be executed when users select a file.
     */
    readonly onSelectFile?: (selectedFileUri: string) => void;
}
