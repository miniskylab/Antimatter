/* eslint-disable max-len */
export const ValidationMessageTemplate = {
    PropsValidationErrorOccurred: "Props validation error occurred in <{0}>.",
    Required: "Property \"{0}\" is required. Received value: {0} = {1}",
    MustBeEmpty: "Property \"{0}\" must be null, undefined or empty string. Received value: {0} = {1}",
    MustBeInteger: "Property \"{0}\" must be an integer. Received value: {0} = {1}",
    MustBeDate: "Property \"{0}\" must be of type Date. Received value: {0} = {1}",
    MustBeBoolean: "Property \"{0}\" must be of type boolean. Received value: {0} = {1}",
    MustBeString: "Property \"{0}\" must be of type string. Received value: {0} = {1}",
    MustBeNumber: "Property \"{0}\" must be of type number. Received value: {0} = {1}",
    MustBeArray: "Property \"{0}\" must be an array. Received value: {0} = {1}",
    MustBeEnum: "Property \"{0}\" must be a valid enum value. Received value: {0} = {1}",
    MustBeHexColor: "Property \"{0}\" must be hex color string. Received value: {0} = {1}",
    MustBeEmail: "Property \"{0}\" must be an email address. Received value: {0} = {1}",
    CannotBeEmptyString: "Property \"{0}\" cannot be empty string. Received value: {0} = {1}",
    CannotBeEmptyArray: "Property \"{0}\" cannot be an empty array. Received value: {0} = {1}",
    CannotBeGreaterThanValue: (value: number) => `Property \"{0}\" cannot be greater than ${value}. Received value: {0} = {1}`,
    CannotBeLessThanValue: (value: number) => `Property \"{0}\" cannot be less than ${value}. Received value: {0} = {1}`,
    CannotBeGreaterThanOrEqualToValue: (value: number) => `Property \"{0}\" cannot be greater than or equal to ${value}. Received value: {0} = {1}`,
    CannotBeLessThanOrEqualToValue: (value: number) => `Property \"{0}\" cannot be less than or equal to ${value}. Received value: {0} = {1}`
};
