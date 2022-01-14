import FormInput from "@formular/inputs/FormInput";
import { FormInput as FormInputType } from "@formular/types";
import React, { FC } from "react";

const StringInput: FC<FormInputType<string>> = ({
    name,
    validationLabel,
    validators,
    ...otherProps
}) => (
    <FormInput<string>
        name={name}
        validationLabel={validationLabel}
        validators={validators}
    >
        {({ onChange, name, value, triggerValidation }) => (
            <input
                type="text"
                name={name}
                value={value || ""}
                onChange={(e) => {
                    onChange(e.target.value);
                }}
                onBlur={triggerValidation}
                {...otherProps}
            />
        )}
    </FormInput>
);

export default StringInput;
