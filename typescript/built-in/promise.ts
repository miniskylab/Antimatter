declare global
{
    interface PromiseConstructor
    {
        sleep(ms: number): Promise<void>;
    }
}

Promise.sleep = async function (ms: number): Promise<void>
{
    return new Promise<void>((resolve): void => { setTimeout(resolve, ms); });
};

export {};
