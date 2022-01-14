import { renderWithFormContext } from "@formular/test/utils";
import { fireEvent } from "@testing-library/react";
import React from "react";
import FormInput from "./FormInput";

const createTestProps = () => ({
    name: "firstname"
});

const renderComponent = ({ name, labelText, initialValue }: { name: string, labelText: string, initialValue: unknown }) =>
    renderWithFormContext(
        <FormInput<string> name={name} label={labelText}>
            {({ onChange, name, value }) => (
                <label>
                    {labelText}
                    <input
                        name={name}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    />
                </label>
            )}
        </FormInput>,
        { value: initialValue }
    );

test("FormInput should pass changes to the form context", () => {
    const { name } = createTestProps();
    const labelText = "First Name";
    const testValue = "Joey";
    const { formContext, getByLabelText } = renderComponent({
        name,
        labelText,
        initialValue: ""
    });

    fireEvent.change(getByLabelText(labelText), { target: { value: testValue } });
    expect(formContext.onChange).toHaveBeenCalledWith(name, testValue);
});
