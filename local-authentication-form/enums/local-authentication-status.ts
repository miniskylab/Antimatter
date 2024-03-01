export enum LocalAuthenticationStatus
{
    Unknown = "Unknown",
    BiometricHardwareAccessDenied = "BiometricHardwareAccessDenied",
    UnauthenticatedAutoPrompt = "UnauthenticatedAutoPrompt",
    UnauthenticatedManualPrompt = "UnauthenticatedManualPrompt",
    InProgress = "InProgress",
    WaitingForConfirmation = "WaitingForConfirmation",
    Authenticated = "Authenticated"
}
