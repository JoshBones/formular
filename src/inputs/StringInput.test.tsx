import React from "react";
import { alwaysBadValidator, renderWithFormContext } from "@formular/test/utils";
import StringInput from "./StringInput";
import { fireEvent } from "@testing-library/react";

test("StringInput should correctly use `FormInput`", () => {
    const initialValue = "";
    const updatedValue = "Bobby";
    const props = {
        name: "firstname",
        validationLabel: "First Name",
        validators: [alwaysBadValidator.validator]
    };
    const { getByRole, formContext } = renderWithFormContext(<StringInput {...props} />, {
        initialValues: { [props.name]: initialValue },
    });

    fireEvent.change(getByRole("textbox"), { target: { value: updatedValue } });
    fireEvent.blur(getByRole("textbox"));
    expect(formContext.onChange).toHaveBeenCalledWith(props.name, updatedValue);
    expect(formContext.setValidity).toHaveBeenCalledWith(props.name, [alwaysBadValidator.errorMessage]);
    expect(formContext.getValue).toHaveBeenCalled();
});
