import { ReactElement, useContext, useCallback } from "react";
import { FormularContext } from "@formular/globals";
import { Validator } from "@formular/types";

type Props<T> = {
    name: string;
    validationLabel?: string;
    validators?: Validator<T>[];
    children: ({
        onChange,
        name,
        value,
        isValid,
        triggerValidation,
    }: {
        onChange: (value: T) => void;
        name: string;
        value: T;
        isValid: boolean;
        triggerValidation: () => void;
    }) => ReactElement;
};

export default function FormInput<T>({
    name,
    validationLabel: label,
    validators = [],
    children,
}: Props<T>) {
    const context = useContext(FormularContext);
    const value = context.getValue(name) as T;
    const isValid = (context.getErrors(name) || []).length > 0;
    const validate = () => {
        const validationResult = validators
            .map((validator) => validator(label || name, value))
            .reduce(
                (overallResult, currentResult) => {
                    overallResult = {
                        isValid: overallResult.isValid && currentResult.isValid,
                        messages: [
                            ...overallResult.messages,
                            currentResult.message,
                        ],
                    };

                    return overallResult;
                },
                { isValid: true, messages: [] }
            );

        context.setValidity(
            name,
            validationResult.messages.filter((x) => typeof x === "string")
        );
    };

    return children({
        onChange: (updatedValue) => context.onChange(name, updatedValue),
        name,
        value,
        isValid,
        triggerValidation: validate,
    });
}
