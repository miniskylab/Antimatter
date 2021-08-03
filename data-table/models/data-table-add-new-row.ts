import {IsDefined, IsNotEmpty, IsString} from "antimatter/validation";

export class DataTableAddNewRow
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
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly text: string;
}
