export enum LocalAuthenticationStatus
{
    Unknown = "Unknown",
    BiometricHardwareAccessDenied = "BiometricHardwareAccessDenied",
    UnauthenticatedAutoPrompt = "UnauthenticatedAutoPrompt",
    UnauthenticatedManualPrompt = "UnauthenticatedManualPrompt",
    InProgress = "InProgress",
    WaitingForForeground = "WaitingForForeground",
    Authenticated = "Authenticated"
}
