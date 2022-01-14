import { Validator } from "../types";

const phoneNumberValidator: Validator<[string, string]> = (label, [areaCode, number]) => {
    // we could skip the need for this by using an area code <select/>
    const isAreaCodeValid = /^\+\d{1,3}$/.test(areaCode);
    // this is dumb, phone number are more complex than this but its just an example
    const isNumberValid = /\d{10}/.test(number);
    const isValid = isAreaCodeValid && isNumberValid;
    return {
        isValid,
        message: !isValid && `${label} is an invalid phone number` //most useful error message ever ;)
    }
};

export default phoneNumberValidator;
