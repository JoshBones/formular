import React from "react";
import { alwaysBadValidator, renderWithFormContext } from "@formular/test/utils";
import NumberInput from "./NumberInput";
import { fireEvent } from "@testing-library/react";

test("NumberInput should correctly use `FormInput`", () => {
    const initialValue = null;
    const updatedValue = 12;
    const props = {
        name: "age",
        validationLabel: "Age",
        validators: [alwaysBadValidator.validator]
    };
    const { getByRole, formContext } = renderWithFormContext(
        <NumberInput {...props} />,
        {
            initialValues: { [props.name]: initialValue },
        }
    );

    fireEvent.change(getByRole("spinbutton"), {
        target: { value: updatedValue },
    });
    fireEvent.blur(getByRole("spinbutton"));
    expect(formContext.onChange).toHaveBeenCalledWith(props.name, updatedValue);
    expect(formContext.setValidity).toHaveBeenCalledWith(props.name, [alwaysBadValidator.errorMessage]);
    expect(formContext.getValue).toHaveBeenCalled();
});
