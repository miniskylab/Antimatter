export type TransactionTableRef = {
    readonly flashHighlightTransactions: (transactionIds: string[]) => void;
    readonly verticalContractTransactions: (transactionIds: string[], onAnimationEnd: (transactionId: string) => void) => void;
};
