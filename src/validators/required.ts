import { Validator} from "../types";

const isRequiredValidator: Validator<unknown> = (label, value) => {
    const isValid = value !== null && value !== "" && typeof(value) !== "undefined";

    return {
        isValid,
        message: !isValid && `A value is required for ${label}`,
    };
}

export default isRequiredValidator;
