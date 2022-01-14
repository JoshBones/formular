import {
    renderWithFormContext,
    alwaysBadValidator,
} from "@formular/test/utils";
import { Validator } from "@formular/types";
import { fireEvent } from "@testing-library/react";
import React from "react";
import FormInput from "./FormInput";

const renderComponent = ({
    name,
    labelText,
    initialValue,
    validators,
}: {
    name: string;
    labelText: string;
    initialValue: unknown;
    validators?: Validator<unknown>[];
}) =>
    renderWithFormContext(
        <FormInput<string>
            name={name}
            validationLabel={labelText}
            validators={validators || []}
        >
            {({ onChange, name, value, triggerValidation }) => (
                <label>
                    {labelText}
                    <input
                        name={name}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={triggerValidation}
                    />
                </label>
            )}
        </FormInput>,
        { initialValues: { [name]: initialValue } }
    );

test("FormInput should pass changes to the form context", () => {
    const name = "firstname";
    const labelText = "First Name";
    const testValue = "Joey";
    const { formContext, getByLabelText } = renderComponent({
        name,
        labelText,
        initialValue: "",
    });

    fireEvent.change(getByLabelText(labelText), {
        target: { value: testValue },
    });
    expect(formContext.onChange).toHaveBeenCalledWith(name, testValue);
});

test("FormInput should pass validation errors to form context", () => {
    const name = "firstname";
    const labelText = "First Name";

    const { formContext, getByLabelText } = renderComponent({
        name,
        labelText,
        initialValue: "",
        validators: [alwaysBadValidator.validator],
    });

    fireEvent.blur(getByLabelText(labelText));
    expect(formContext.setValidity).toHaveBeenCalledWith(name, [
        alwaysBadValidator.errorMessage,
    ]);
});
