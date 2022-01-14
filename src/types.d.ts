import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type ValueOf<T> = T[keyof T]; // TODO unused currently

export type FormFields = Record<string, unknown>;

export type FormContext = {
    onChange: (name: string, value: unknown) => void;
    getValue: (name: string) => unknown;
    setValidity: (name: string, messages: string[]) => void;
    getErrors: (name: string) => string[];
};

export type ValidatorResult = {
    isValid: boolean;
    message: string;
};

export type ValidationResult = {
    isValid: boolean;
    messages?: string[];
};

export type Validator<T> = (label: string, value: T) => ValidatorResult;

export interface FormInput<T> extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> {
    name: string;
    validationLabel?: string;
    validators?: Validator<T>[];
}
