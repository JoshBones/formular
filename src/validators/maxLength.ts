import { Validator } from "../types";

const createMaxLengthValidator: (maxLength: number) => Validator<string> =
    (maxLength) => (label, value) => {
        const isValid = value.length <= maxLength;

        return {
            isValid,
            message:
                !isValid &&
                `${label} must be no more than ${maxLength} characters long.`,
        };
    };

export default createMaxLengthValidator;
