import { Validator } from "../types";

const createMinLengthValidator: (minLength: number) => Validator<string> =
    (minLength) => (label, value) => {
        const isValid = value.length >= minLength;

        return {
            isValid,
            message:
                !isValid &&
                `${label} must be at least ${minLength} characters long.`,
        };
    };

export default createMinLengthValidator;
