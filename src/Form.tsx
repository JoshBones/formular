import React, { useState, ReactNode } from "react";
import { FormularContext } from "@formular/globals";
import { FormContext } from "@formular/types";

type Props<FormFields> = {
    title: string;
    onSubmit: (values: FormFields) => void;
    initialValues: FormFields;
    children: ({
        errors,
        isFormValid,
    }: {
        errors: Record<string, string[]>;
        isFormValid: boolean;
    }) => ReactNode;
};

const generateInitialErrors = <FormFields extends Record<string, unknown>>(
    values: FormFields
) =>
    Object.keys(values).reduce(
        (acc, key) => ({
            ...acc,
            [key]: [],
        }),
        {}
    );

export default function Form<FormFields extends Record<string, unknown>>({
    title,
    onSubmit,
    initialValues,
    children,
}: Props<FormFields>) {
    const [formValues, setFormValues] = useState<FormFields>(initialValues);
    const [formErrors, setFormErrors] = useState<Record<string, string[]>>(
        generateInitialErrors(initialValues)
    );
    const [isFormValid, setIsForValid] = useState<boolean>(true);
    const setFormValue = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };
    const getFormValue = (name: keyof FormFields) => formValues[name];
    const setValidity = (name: string, errorMessages: string[]) => {
        const updatedFormErrors = {
            ...formErrors,
            [name]: errorMessages,
        };
        setFormErrors(updatedFormErrors);
        setIsForValid(
            Object.keys(updatedFormErrors).reduce(
                (isValid, errs) =>
                    isValid && updatedFormErrors[errs].length === 0,
                true
            )
        );
    };
    const getErrors = (name: string) => formErrors[name];
    const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        onSubmit(formValues);
    };
    const context: FormContext = {
        onChange: setFormValue,
        getValue: getFormValue,
        setValidity,
        getErrors,
    };

    return (
        <FormularContext.Provider value={context}>
            <form role="form" title={title} onSubmit={onFormSubmit}>
                {children({ errors: formErrors, isFormValid })}
            </form>
        </FormularContext.Provider>
    );
}
