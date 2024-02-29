export enum LocalAuthenticationStatus
{
    Unknown = "Unknown",
    BiometricHardwareAccessDenied = "BiometricHardwareAccessDenied",
    UnauthenticatedAutoPrompt = "UnauthenticatedAutoPrompt",
    UnauthenticatedManualPrompt = "UnauthenticatedManualPrompt",
    PromptInProgress = "PromptInProgress",
    WaitingForConfirmation = "WaitingForConfirmation",
    Authenticated = "Authenticated"
}
