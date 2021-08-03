import {IsDefined, IsNotEmpty, IsString} from "antimatter/validation";
import {IsOptional} from "class-validator";

export class ImageUrl
{
    /**
     *
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly thumbnail?: string;


    /**
     *
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly small?: string;


    /**
     *
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly medium?: string;


    /**
     *
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly large?: string;


    /**
     *
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly original: string;
}
