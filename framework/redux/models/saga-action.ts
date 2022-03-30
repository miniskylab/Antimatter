import {AnyAction} from "redux";

export abstract class SagaAction implements AnyAction
{
    readonly type: string;

    [extraProps: string]: unknown;

    constructor()
    {
        this.type = this.constructor.name;
    }

    abstract doSideEffectWork(): Generator;
}
