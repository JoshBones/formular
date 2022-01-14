import React from "react";
import userEvent from "@testing-library/user-event";
import { renderWithFormContext } from "@formular/test/utils";
import FormInput from "./FormInput";

const createTestProps = () => ({
    name: "firstname"
});

const renderComponent = ({ name, labelText }) =>
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
        </FormInput>
    );

test.skip("FormInput should pass changes to the form context", () => {
    const { name } = createTestProps();
    const labelText = "First Name";
    const testValue = "Joey";
    const { formContext, getByLabelText } = renderComponent({
        name,
        labelText,
    });
    userEvent.type(getByLabelText(labelText), testValue);
    expect(formContext.onChange).toHaveBeenCalledWith(name, testValue);
});
