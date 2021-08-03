import {ArrayNotEmpty, IsArray, IsDefined, IsNotEmpty, IsString} from "antimatter/validation";

export class DataTableRow
{
    /**
     *
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly id: string;


    /**
     *
     */
    @ArrayNotEmpty()
    @IsArray()
    @IsDefined()
    readonly cells: JSX.Element[];
}
